import os, sys
import win32api
import win32security
import ntsecuritycon as con

import requests
import argparse
import datetime

def show_cacls (filename):
  print()
  print()
  for line in os.popen ("cacls %s" % filename).read ().splitlines ():
    print(line)

def auditFile(fileName, auditVal):
    #
    # Find the SIDs for Everyone, the Admin group and the current user
    #
    everyone, domain, type = win32security.LookupAccountName("", "Everyone")
    admins, domain, type = win32security.LookupAccountName("", "Administrators")
    user, domain, type = win32security.LookupAccountName("", win32api.GetUserName())

    #
    # Touch the file and use CACLS to show its default permissions
    # (which will probably be: Admins->Full; Owner->Full; Everyone->Read)
    #
    open(fileName, "w").close()
    show_cacls(fileName)

    #
    # Find the DACL part of the Security Descriptor for the file
    #
    sd = win32security.GetFileSecurity(fileName, win32security.DACL_SECURITY_INFORMATION)

    #
    # Create a blank DACL and add the three ACEs we want
    # We will completely replace the original DACL with
    # this. Obviously you might want to alter the original
    # instead.
    #
    # Read : 1179785
    # Write : 1179926
    # Execute : 1179808
    # Read | Write: 1180063
    # Read | Execute: 1179817
    # Write | Execute: 1180086
    # Full: 2032639
    #

    dacl = win32security.ACL()

    dacl.AddAccessAllowedAce(win32security.ACL_REVISION, auditVal, everyone)
    dacl.AddAccessAllowedAce(win32security.ACL_REVISION, auditVal, user)
    dacl.AddAccessAllowedAce(win32security.ACL_REVISION, auditVal, admins)

    #
    # Put our new DACL into the Security Descriptor,
    # update the file with the updated SD, and use
    # CACLS to show what's what.
    #
    sd.SetSecurityDescriptorDacl(1, dacl, 0)
    win32security.SetFileSecurity(fileName, win32security.DACL_SECURITY_INFORMATION, sd)
    show_cacls(fileName)

def argsParse():

    parser = argparse.ArgumentParser()
    # default
    parser.add_argument(
        '-p',
        action='store',
        metavar='path',
        help='<Required> The file path.',
        required=True
    )
    parser.add_argument(
        '-a',
        action='store',
        metavar='audit',
        help='The required audit attributes .',
    )

    return parser.parse_args()

if __name__ == "__main__":
    #args = argsParse()
    print("path: "+str(sys.argv[1]))
    print("audit: "+sys.argv[2])
    os.remove(sys.argv[1])
    auditFile(str(sys.argv[1]), int(sys.argv[2]))


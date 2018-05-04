import os
import random
import time
import datetime

EventIds = [4625, 4647, 4660, 4663, 4690, 4776, 4688, 4719, 4817, 5137, 6416, 15501]
Times = [10 , 60]
Computers = ['DESKTOP-A7VD3H8']
FailureReasons = {
    'IpAddress': ['null', 'err'],
    'TargetUserName': ['null', 'DESKTOP-A7VD3H8'],
    'SubjectUserName': ['null', 'DESKTOP-A7VD3H8']
}

for i in range(1000):

    EventId = random.choice(EventIds)
    delta = datetime.timedelta(random.randrange(0, 10)*30, random.randrange(0, 60)*60*60,  random.randrange(0, 60)*60*60*60)
    Time = (datetime.datetime.now() + delta).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    Computer = random.choice(Computers)
    print(Time)
    IpAddress = random.choice(FailureReasons['IpAddress'])
    TargetUserName = random.choice(FailureReasons['TargetUserName'])
    SubjectUserName = random.choice(FailureReasons['SubjectUserName'])

    str = 'test.py --EventId {} --TimeCreated {} --Computer {} FailureReason {} IpAddress {} TargetUserName {} SubjectUserName {}'.format(
        EventId,
        Time,
        Computer,
        "FailRes",
        IpAddress,
        TargetUserName,
        SubjectUserName)


    print(str)
    os.system(str)

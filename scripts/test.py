import requests
import argparse
import datetime


parser = argparse.ArgumentParser()
# default
parser.add_argument(
    '--EventId',
    action='store',
    metavar='EventID',
    help='<Required> The log event id.',
    #required=True
)
parser.add_argument(
    '--TimeCreated',
    action='store',
    metavar='TimeCreated',
    help='<Required> The time that the log was created.',
)
parser.add_argument(
    '--Computer',
    action='store',
    metavar='Computer',
    help='<Required> The computer that the log was created on.',
)
parser.add_argument(
    'moreInfo',
    action='store',
    metavar='moreInfo',
    help='<Required> The moreInfo that the log was created on.',
    nargs='*'
)

args = parser.parse_args()


def postLog():
    data = vars(args)

    if data['TimeCreated'] == '$(TimeCreated)':
        data['TimeCreated'] = str(datetime.datetime.now())
    print(data)

    response = requests.post('http://localhost:3000/logs', json=data)
    print(response.status_code)


if __name__ == '__main__':
    postLog()



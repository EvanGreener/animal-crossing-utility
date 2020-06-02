import csv
import requests
from bs4 import BeautifulSoup
import os
import sys

# Get array of img links which isn't in csv file
fishURL = 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)'
bugURL = 'https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)'

fishPage = requests.get(fishURL)
soup = BeautifulSoup(fishPage.content, 'html.parser')

a_eles = soup.find_all('a', class_='image image-thumbnail')
fish_img_srcs = []
for a in a_eles:
    fish_img_srcs.append(a['href'])

bugPage = requests.get(bugURL)
soup = BeautifulSoup(bugPage.content, 'html.parser')

a_eles = soup.find_all('a', class_='image image-thumbnail')
bug_img_srcs = []
for a in a_eles:
    bug_img_srcs.append(a['href'])


def convertToBool(str):
    return '✓' in str


current_dir = sys.path[0]
# Copy paste output
with open(os.path.join(current_dir, "fish-north.csv")) as csv_file:
    with open(os.path.join(current_dir, "output.txt"), "w") as output:
        csv_reader = csv.DictReader(csv_file)
        counter = 0
        output.write('-- Fish records \n')
        for row in csv_reader:
            time_str = row["Time"]
            start = ''
            end = ''
            if 'All day' in time_str:
                start = '00:00:00'
                end = '23:59:59'
            else:
                # e.g. 9 AM - 4 pm
                split_str = time_str.split()
                if 'AM' in split_str[1]:
                    start = f'{split_str[0]}:00:00'
                else:
                    start = f'{int(split_str[0]) + 12}:00:00'

                if 'AM' in split_str[4]:
                    end = f'{split_str[3]}:00:00'
                else:
                    end = f'{int(split_str[3]) + 12}:00:00'

            price = row["Price"]
            if price == '?':
                price = 'null'

            output.write(
                f'\t(\'{row["Name"]}\', \'fish\', \'{fish_img_srcs[counter]}\', {price }, \'{row["Location"]}\', \'{start}\', \'{end}\', {convertToBool(row["Jan"])}, {convertToBool(row["Feb"])}, {convertToBool(row["Mar"])}, {convertToBool(row["Apr"])}, {convertToBool(row["May"])}, {convertToBool(row["Jun"])}, {convertToBool(row["Jul"])}, {convertToBool(row["Aug"])}, {convertToBool(row["Sep"])}, {convertToBool(row["Oct"])}, {convertToBool(row["Nov"])}, {convertToBool(row["Dec"])}),\n')
            counter += 1
        print(f'### Processed {counter} fish records')


with open(os.path.join(current_dir, "bugs-north.csv")) as csv_file:
    with open(os.path.join(current_dir, "output.txt"), "a") as output:
        csv_reader = csv.DictReader(csv_file)
        counter = 0
        output.write('-- Bug records \n')
        for row in csv_reader:
            time_str = row["Time"]
            start = ''
            end = ''
            if 'all day' in time_str.lower():
                start = '00:00:00'
                end = '23:59:59'
            else:
                # e.g. 9 AM - 4 pm
                split_str = time_str.split()
                if 'AM' in split_str[1]:
                    start = f'{split_str[0]}:00:00'
                else:
                    start = f'{int(split_str[0]) + 12}:00:00'

                if 'AM' in split_str[4]:
                    end = f'{split_str[3]}:00:00'
                else:
                    end = f'{int(split_str[3]) + 12}:00:00'

            price = row["Price"]
            if price == '?':
                price = 'null'

            output.write(
                f'\t(\'{row["Name"]}\', \'bug\', \'{bug_img_srcs[counter]}\', {price}, \'{row["Location"]}\', \'{start}\', \'{end}\', {convertToBool(row["Jan"])}, {convertToBool(row["Feb"])}, {convertToBool(row["Mar"])}, {convertToBool(row["Apr"])}, {convertToBool(row["May"])}, {convertToBool(row["Jun"])}, {convertToBool(row["Jul"])}, {convertToBool(row["Aug"])}, {convertToBool(row["Sep"])}, {convertToBool(row["Oct"])}, {convertToBool(row["Nov"])}, {convertToBool(row["Dec"])}),\n')
            counter += 1
        print(f'### Processed {counter} bug records')

print('See output.txt')

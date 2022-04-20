from textwrap import indent
from selenium import webdriver
from bs4 import BeautifulSoup
from time import sleep
import json

driver = webdriver.Chrome()
driver.get("https://www2.hm.com/en_us/customer-service/sizeguide/ladies.html")
driver.execute_script("window.scrollBy(0,500)","")
driver.find_element_by_xpath("//button[contains(text(),\'TOPS, BLOUSES ETC.')]").click()
driver.execute_script("window.scrollBy(0,500)","")
driver.find_element_by_xpath("//button[contains(text(),\'BOTTOMS')]").click()
driver.execute_script("window.scrollBy(0,500)","")
driver.find_element_by_xpath("//button[contains(text(),\'DRESSES & JUMPSUITS')]").click()
driver.execute_script("window.scrollBy(0,500)","")
woup = BeautifulSoup(driver.page_source, features="html.parser")
driver.execute_script("window.scrollBy(0,500)","")

#Navigating to Men's Page on H&M website
driver.execute_script("window.scrollTo(0,500)","")
driver.find_element_by_xpath("//*[@id='menu-links']/li[8]/ul/li[3]/a").click()
driver.find_element_by_xpath("//button[contains(text(),\'TOPS, SHIRTS, JACKETS, BLAZERS ETC.')]").click()
driver.execute_script("window.scrollBy(0,500)","")
driver.find_element_by_xpath("//button[contains(text(),\'PANTS')]").click()
driver.execute_script("window.scrollBy(0,500)","")
driver.find_element_by_xpath("//button[contains(text(),\'INCH SIZE CONVERSIONS')]").click()
driver.execute_script("window.scrollBy(0,500)","")
driver.find_element_by_xpath("//button[contains(text(),\'LONG SIZES')]").click()
driver.execute_script("window.scrollBy(0,500)","")
moup = BeautifulSoup(driver.page_source, features="html.parser")
driver.execute_script("window.scrollBy(0,500)","")
driver.execute_script("window.scrollTo(0,500)","")
sleep(5)
driver.close()

#Extract Tables and Dump them into dictionary
def getSizeGuides(soup):
    sgs = {}
    i = 0
    guides = soup.find_all("li", class_="toggle-list-item")
    for guide in guides:
        data = {}
        if(guide.find("h3").find("button").text == 'BRAS' or guide.find("h3").find("button").text == 'INCH SIZE CONVERSIONS'):
            break
        data["Title"] = soup.find("h1").text + ": " + guide.find("h3").find("button").text
        if (soup.find("h1").text == "MEN"):
            data["SizeGuide"] = {}
            for size in guide.find("tr").find_all("th"):
                if (size.find("b")):
                    data["SizeGuide"][size.find("b").text] = {}
                    data["SizeGuide"][size.find("b").text + "/L"] = {}
        else:
            data["SizeGuide"] = {}
            for size in guide.find("tr").find_all("th"):
                if (size.find("b")):
                    data["SizeGuide"][size.find("b").text] = {}
        sgs[i] = data
        i += 1
    return sgs

wata = getSizeGuides(woup)
wata[0]["SizeGuide"]["XXS"]["Bust cm"] = [74, 75, 76, 77, 78]
wata[0]["SizeGuide"]["XXS"]["Waist cm"] = [58, 59, 60, 61, 62]
wata[0]["SizeGuide"]["XXS"]["Low Hip cm"] = [82, 83, 84, 85, 86]
wata[0]["SizeGuide"]["XXS"]["Arm Length cm"] = [58, 59]
wata[0]["SizeGuide"]["XXS"]["Associated Sizes"] = {"EUR" : 32, "US" : 0}
wata[0]["SizeGuide"]["XS"]["Bust cm"] = [78, 79, 80, 81 ,82]
wata[0]["SizeGuide"]["XS"]["Waist cm"] = [62, 63, 64, 65, 66]
wata[0]["SizeGuide"]["XS"]["Low Hip cm"] = [86, 87, 88, 89, 90]
wata[0]["SizeGuide"]["XS"]["Arm Length cm"] = [59, 60]
wata[0]["SizeGuide"]["XS"]["Associated Sizes"] = {"EUR" : 34, "US" : 2}
wata[0]["SizeGuide"]["S"]["Bust cm"] = [82, 83, 84, 85, 86, 87, 88, 89, 90]
wata[0]["SizeGuide"]["S"]["Waist cm"] = [66, 67, 68, 69, 70, 71, 72, 73, 74]
wata[0]["SizeGuide"]["S"]["Low Hip cm"] = [90, 91, 92, 93, 94, 95, 96, 97]
wata[0]["SizeGuide"]["S"]["Arm Length cm"] = [59, 60]
wata[0]["SizeGuide"]["S"]["Associated Sizes"] = {"EUR" : [36, 38], "US" : [4, 6]}
wata[0]["SizeGuide"]["M"]["Bust cm"] = [90, 91, 92, 93, 94, 95, 96, 97, 98]
wata[0]["SizeGuide"]["M"]["Waist cm"] = [74, 75, 76, 77, 78, 79, 80, 81, 82]
wata[0]["SizeGuide"]["M"]["Low Hip cm"] = [97, 98, 99, 100, 101, 102, 103]
wata[0]["SizeGuide"]["M"]["Arm Length cm"] = [60]
wata[0]["SizeGuide"]["M"]["Associated Sizes"] = {"EUR" : [40, 42], "US" : [8, 10]}
wata[0]["SizeGuide"]["L"]["Bust cm"] = [98, 99, 100, 101, 102, 103, 104, 105, 106, 107]
wata[0]["SizeGuide"]["L"]["Waist cm"] = [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93]
wata[0]["SizeGuide"]["L"]["Low Hip cm"] = [103, 104, 105, 106, 107, 108, 109, 110]
wata[0]["SizeGuide"]["L"]["Arm Length cm"] = [60, 61]
wata[0]["SizeGuide"]["L"]["Associated Sizes"] = {"EUR" : [44, 46], "US" : [12, 14]}
wata[0]["SizeGuide"]["XL"]["Bust cm"] = [107, 108, 109, 110, 11, 112, 113]
wata[0]["SizeGuide"]["XL"]["Waist cm"] = [93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105]
wata[0]["SizeGuide"]["XL"]["Low Hip cm"] = [110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]
wata[0]["SizeGuide"]["XL"]["Arm Length cm"] = [61]
wata[0]["SizeGuide"]["XL"]["Associated Sizes"] = {"EUR" : [48, 50], "US" : [16, 18]}
wata[0]["SizeGuide"]["2XL"]["Bust cm"] = [119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131]
wata[0]["SizeGuide"]["2XL"]["Waist cm"] = [105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117]
wata[0]["SizeGuide"]["2XL"]["Low Hip cm"] = [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131]
wata[0]["SizeGuide"]["2XL"]["Arm Length cm"] = [61, 62]
wata[0]["SizeGuide"]["2XL"]["Associated Sizes"] = {"EUR" : [52, 54], "US" : [20, 22]}
wata[0]["SizeGuide"]["3XL"]["Bust cm"] = [131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143]
wata[0]["SizeGuide"]["3XL"]["Waist cm"] = [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131]
wata[0]["SizeGuide"]["3XL"]["Low Hip cm"] = [131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143]
wata[0]["SizeGuide"]["3XL"]["Arm Length cm"] = [62]
wata[0]["SizeGuide"]["3XL"]["Associated Sizes"] = {"EUR" : [56, 58], "US" : [24, 26]}
wata[0]["SizeGuide"]["4XL"]["Bust cm"] = [143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155]
wata[0]["SizeGuide"]["4XL"]["Waist cm"] = [131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145]
wata[0]["SizeGuide"]["4XL"]["Low Hip cm"] = [143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155]
wata[0]["SizeGuide"]["4XL"]["Arm Length cm"] = [61, 62]
wata[0]["SizeGuide"]["4XL"]["Associated Sizes"] = {"EUR" : [60, 62], "US" : [28, 30]}

wata[1]["SizeGuide"]["XXS"]["Waist cm"] = [58, 59, 60, 61, 62]
wata[1]["SizeGuide"]["XXS"]["Low Hip cm"] = [82, 83, 84, 85, 86]
wata[1]["SizeGuide"]["XXS"]["Inside Leg cm"] = [78]
wata[1]["SizeGuide"]["XXS"]["Associated Sizes"] = {"EUR" : 32, "US" : 0}
wata[1]["SizeGuide"]["XS"]["Waist cm"] = [62, 63, 64, 65, 66]
wata[1]["SizeGuide"]["XS"]["Low Hip cm"] = [86, 87, 88, 89, 90]
wata[1]["SizeGuide"]["XS"]["Inside Leg cm"] = [78]
wata[1]["SizeGuide"]["XS"]["Associated Sizes"] = {"EUR" : 34, "US" : 2}
wata[1]["SizeGuide"]["S"]["Waist cm"] = [66, 67, 68, 69, 70, 71, 72, 73, 74]
wata[1]["SizeGuide"]["S"]["Low Hip cm"] = [90, 91, 92, 93, 94, 95, 96, 97]
wata[1]["SizeGuide"]["S"]["Inside Leg cm"] = [78]
wata[1]["SizeGuide"]["S"]["Associated Sizes"] = {"EUR" : [36, 38], "US" : [4, 6]}
wata[1]["SizeGuide"]["M"]["Waist cm"] = [74, 75, 76, 77, 78, 79, 80, 81, 82]
wata[1]["SizeGuide"]["M"]["Low Hip cm"] = [97, 98, 99, 100, 101, 102, 103]
wata[1]["SizeGuide"]["M"]["Inside Leg cm"] = [78]
wata[1]["SizeGuide"]["M"]["Associated Sizes"] = {"EUR" : [40, 42], "US" : [8, 10]}
wata[1]["SizeGuide"]["L"]["Waist cm"] = [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93]
wata[1]["SizeGuide"]["L"]["Low Hip cm"] = [103, 104, 105, 106, 107, 108, 109, 110]
wata[1]["SizeGuide"]["L"]["Inside Leg cm"] = [78]
wata[1]["SizeGuide"]["L"]["Associated Sizes"] = {"EUR" : [44, 46], "US" : [12, 14]}
wata[1]["SizeGuide"]["XL"]["Waist cm"] = [93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105]
wata[1]["SizeGuide"]["XL"]["Low Hip cm"] = [110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]
wata[1]["SizeGuide"]["XL"]["Inside Leg cm"] = [78]
wata[1]["SizeGuide"]["XL"]["Associated Sizes"] = {"EUR" : [48, 50], "US" : [16, 18]}
wata[1]["SizeGuide"]["2XL"]["Waist cm"] = [105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117]
wata[1]["SizeGuide"]["2XL"]["Low Hip cm"] = [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131]
wata[1]["SizeGuide"]["2XL"]["Inside Leg cm"] = [78]
wata[1]["SizeGuide"]["2XL"]["Associated Sizes"] = {"EUR" : [52, 54], "US" : [20, 22]}
wata[1]["SizeGuide"]["3XL"]["Waist cm"] = [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131]
wata[1]["SizeGuide"]["3XL"]["Low Hip cm"] = [131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143]
wata[1]["SizeGuide"]["3XL"]["Inside Leg cm"] = [78]
wata[1]["SizeGuide"]["3XL"]["Associated Sizes"] = {"EUR" : [56, 58], "US" : [24, 26]}
wata[1]["SizeGuide"]["4XL"]["Waist cm"] = [131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145]
wata[1]["SizeGuide"]["4XL"]["Low Hip cm"] = [143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155]
wata[1]["SizeGuide"]["4XL"]["Inside Leg cm"] = [78]
wata[1]["SizeGuide"]["4XL"]["Associated Sizes"] = {"EUR" : [60, 62], "US" : [28, 30]}

wata[2]["SizeGuide"]["XXS"]["Bust cm"] = [74, 75, 76, 77, 78]
wata[2]["SizeGuide"]["XXS"]["Waist cm"] = [58, 59, 60, 61, 62]
wata[2]["SizeGuide"]["XXS"]["Low Hip cm"] = [82, 83, 84, 85, 86]
wata[2]["SizeGuide"]["XXS"]["Arm Length cm"] = [58, 59]
wata[2]["SizeGuide"]["XXS"]["Inside Leg cm"] = [78]
wata[2]["SizeGuide"]["XXS"]["Associated Sizes"] = {"EUR" : 32, "US" : 0}
wata[2]["SizeGuide"]["XS"]["Bust cm"] = [78, 79, 80, 81 ,82]
wata[2]["SizeGuide"]["XS"]["Waist cm"] = [62, 63, 64, 65, 66]
wata[2]["SizeGuide"]["XS"]["Low Hip cm"] = [86, 87, 88, 89, 90]
wata[2]["SizeGuide"]["XS"]["Arm Length cm"] = [59, 60]
wata[2]["SizeGuide"]["XS"]["Inside Leg cm"] = [78]
wata[2]["SizeGuide"]["XS"]["Associated Sizes"] = {"EUR" : 34, "US" : 2}
wata[2]["SizeGuide"]["S"]["Bust cm"] = [82, 83, 84, 85, 86, 87, 88, 89, 90]
wata[2]["SizeGuide"]["S"]["Waist cm"] = [66, 67, 68, 69, 70, 71, 72, 73, 74]
wata[2]["SizeGuide"]["S"]["Low Hip cm"] = [90, 91, 92, 93, 94, 95, 96, 97]
wata[2]["SizeGuide"]["S"]["Arm Length cm"] = [59, 60]
wata[2]["SizeGuide"]["S"]["Inside Leg cm"] = [78]
wata[2]["SizeGuide"]["S"]["Associated Sizes"] = {"EUR" : [36, 38], "US" : [4, 6]}
wata[2]["SizeGuide"]["M"]["Bust cm"] = [90, 91, 92, 93, 94, 95, 96, 97, 98]
wata[2]["SizeGuide"]["M"]["Waist cm"] = [74, 75, 76, 77, 78, 79, 80, 81, 82]
wata[2]["SizeGuide"]["M"]["Low Hip cm"] = [97, 98, 99, 100, 101, 102, 103]
wata[2]["SizeGuide"]["M"]["Arm Length cm"] = [60]
wata[2]["SizeGuide"]["M"]["Inside Leg cm"] = [78]
wata[2]["SizeGuide"]["M"]["Associated Sizes"] = {"EUR" : [40, 42], "US" : [8, 10]}
wata[2]["SizeGuide"]["L"]["Bust cm"] = [98, 99, 100, 101, 102, 103, 104, 105, 106, 107]
wata[2]["SizeGuide"]["L"]["Waist cm"] = [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93]
wata[2]["SizeGuide"]["L"]["Low Hip cm"] = [103, 104, 105, 106, 107, 108, 109, 110]
wata[2]["SizeGuide"]["L"]["Arm Length cm"] = [60, 61]
wata[2]["SizeGuide"]["L"]["Inside Leg cm"] = [78]
wata[2]["SizeGuide"]["L"]["Associated Sizes"] = {"EUR" : [44, 46], "US" : [12, 14]}
wata[2]["SizeGuide"]["XL"]["Bust cm"] = [107, 108, 109, 110, 11, 112, 113]
wata[2]["SizeGuide"]["XL"]["Waist cm"] = [93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105]
wata[2]["SizeGuide"]["XL"]["Low Hip cm"] = [110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]
wata[2]["SizeGuide"]["XL"]["Arm Length cm"] = [61]
wata[2]["SizeGuide"]["XL"]["Inside Leg cm"] = [78]
wata[2]["SizeGuide"]["XL"]["Associated Sizes"] = {"EUR" : [48, 50], "US" : [16, 18]}
wata[2]["SizeGuide"]["2XL"]["Bust cm"] = [119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131]
wata[2]["SizeGuide"]["2XL"]["Waist cm"] = [105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117]
wata[2]["SizeGuide"]["2XL"]["Low Hip cm"] = [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131]
wata[2]["SizeGuide"]["2XL"]["Arm Length cm"] = [61, 62]
wata[2]["SizeGuide"]["2XL"]["Inside Leg cm"] = [78]
wata[2]["SizeGuide"]["2XL"]["Associated Sizes"] = {"EUR" : [52, 54], "US" : [20, 22]}
wata[2]["SizeGuide"]["3XL"]["Bust cm"] = [131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143]
wata[2]["SizeGuide"]["3XL"]["Waist cm"] = [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131]
wata[2]["SizeGuide"]["3XL"]["Low Hip cm"] = [131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143]
wata[2]["SizeGuide"]["3XL"]["Arm Length cm"] = [62]
wata[2]["SizeGuide"]["3XL"]["Inside Leg cm"] = [78]
wata[2]["SizeGuide"]["3XL"]["Associated Sizes"] = {"EUR" : [56, 58], "US" : [24, 26]}
wata[2]["SizeGuide"]["4XL"]["Bust cm"] = [143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155]
wata[2]["SizeGuide"]["4XL"]["Waist cm"] = [131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145]
wata[2]["SizeGuide"]["4XL"]["Low Hip cm"] = [143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155]
wata[2]["SizeGuide"]["4XL"]["Arm Length cm"] = [61, 62]
wata[2]["SizeGuide"]["4XL"]["Inside Leg cm"] = [78]
wata[2]["SizeGuide"]["4XL"]["Associated Sizes"] = {"EUR" : [60, 62], "US" : [28, 30]}

mata = getSizeGuides(moup)
mata[0]["SizeGuide"]["XS"]["Chest cm"] = [78, 79, 80, 81, 82, 83, 84, 85, 86]
mata[0]["SizeGuide"]["XS"]["Waist cm"] = [66, 67, 68, 69, 70, 71, 72, 73, 74]
mata[0]["SizeGuide"]["XS"]["Neckline cm"] = [34, 35]
mata[0]["SizeGuide"]["XS"]["Armlength cm"] = [62]
mata[0]["SizeGuide"]["XS"]["Associated Sizes"] = {"EUR" : [40, 42], "US" : ["30R", "32R"]}
mata[0]["SizeGuide"]["XS/L"]["Chest cm"] = [78, 79, 80, 81, 82, 83, 84, 85, 86]
mata[0]["SizeGuide"]["XS/L"]["Waist cm"] = [66, 67, 68, 69, 70, 71, 72, 73, 74]
mata[0]["SizeGuide"]["XS/L"]["Neckline cm"] = [34, 35]
mata[0]["SizeGuide"]["XS/L"]["Armlength cm"] = [65]
mata[0]["SizeGuide"]["XS/L"]["Associated Sizes"] = {"US" : ["30L", "32L"]}
mata[0]["SizeGuide"]["S"]["Chest cm"] = [86, 87, 88, 89, 90, 91, 92, 93, 94]
mata[0]["SizeGuide"]["S"]["Waist cm"] = [74, 75, 76, 77, 78, 79, 80, 81, 82]
mata[0]["SizeGuide"]["S"]["Neckline cm"] = [36, 37]
mata[0]["SizeGuide"]["S"]["Armlength cm"] = [62, 63]
mata[0]["SizeGuide"]["S"]["Associated Sizes"] = {"EUR" : [44, 46], "US" : ["34R", "36R"]}
mata[0]["SizeGuide"]["S/L"]["Chest cm"] = [86, 87, 88, 89, 90, 91, 92, 93, 94]
mata[0]["SizeGuide"]["S/L"]["Waist cm"] = [74, 75, 76, 77, 78, 79, 80, 81, 82]
mata[0]["SizeGuide"]["S/L"]["Neckline cm"] = [36, 37]
mata[0]["SizeGuide"]["S/L"]["Armlength cm"] = [65, 66]
mata[0]["SizeGuide"]["S/L"]["Associated Sizes"] = {"US" : ["34L", "36L"]}
mata[0]["SizeGuide"]["M"]["Chest cm"] = [94, 95, 96, 97, 98, 99, 100, 101, 102]
mata[0]["SizeGuide"]["M"]["Waist cm"] = [82, 83, 84, 85, 86, 87, 88, 89, 90]
mata[0]["SizeGuide"]["M"]["Neckline cm"] = [38, 39]
mata[0]["SizeGuide"]["M"]["Armlength cm"] = [63, 64]
mata[0]["SizeGuide"]["M"]["Associated Sizes"] = {"EUR" : [48, 50], "US" : ["38R", "40R"]}
mata[0]["SizeGuide"]["M/L"]["Chest cm"] = [94, 95, 96, 97, 98, 99, 100, 101, 102]
mata[0]["SizeGuide"]["M/L"]["Waist cm"] = [82, 83, 84, 85, 86, 87, 88, 89, 90]
mata[0]["SizeGuide"]["M/L"]["Neckline cm"] = [38, 39]
mata[0]["SizeGuide"]["M/L"]["Armlength cm"] = [66, 67]
mata[0]["SizeGuide"]["M/L"]["Associated Sizes"] = {"US" : ["38L", "40L"]}
mata[0]["SizeGuide"]["L"]["Chest cm"] = [102, 103, 104, 105, 106, 107, 108, 109, 110]
mata[0]["SizeGuide"]["L"]["Waist cm"] = [90, 91, 92, 93, 94, 95, 96, 97, 98]
mata[0]["SizeGuide"]["L"]["Neckline cm"] = [40, 41]
mata[0]["SizeGuide"]["L"]["Armlength cm"] = [64, 65]
mata[0]["SizeGuide"]["L"]["Associated Sizes"] = {"EUR" : [52, 54], "US" : ["42R", "44R"]}
mata[0]["SizeGuide"]["L/L"]["Chest cm"] = [102, 103, 104, 105, 106, 107, 108, 109, 110]
mata[0]["SizeGuide"]["L/L"]["Waist cm"] = [90, 91, 92, 93, 94, 95, 96, 97, 98]
mata[0]["SizeGuide"]["L/L"]["Neckline cm"] = [40, 41]
mata[0]["SizeGuide"]["L/L"]["Armlength cm"] = [67, 68]
mata[0]["SizeGuide"]["L/L"]["Associated Sizes"] = {"US" : ["42L", "44L"]}
mata[0]["SizeGuide"]["XL"]["Chest cm"] = [110, 111, 112, 113, 114, 115, 116, 117, 118]
mata[0]["SizeGuide"]["XL"]["Waist cm"] = [98, 99, 100, 101, 102, 103, 104, 105, 106, 107]
mata[0]["SizeGuide"]["XL"]["Neckline cm"] = [42, 43]
mata[0]["SizeGuide"]["XL"]["Armlength cm"] = [65, 66]
mata[0]["SizeGuide"]["XL"]["Associated Sizes"] = {"EUR" : [56, 58], "US" : ["46R", "48R"]}
mata[0]["SizeGuide"]["XL/L"]["Chest cm"] = [110, 111, 112, 113, 114, 115, 116, 117, 118]
mata[0]["SizeGuide"]["XL/L"]["Waist cm"] = [98, 99, 100, 101, 102, 103, 104, 105, 106, 107]
mata[0]["SizeGuide"]["XL/L"]["Neckline cm"] = [42, 43]
mata[0]["SizeGuide"]["XL/L"]["Armlength cm"] = [68]
mata[0]["SizeGuide"]["XL/L"]["Associated Sizes"] = {"US" : ["46L", "48L"]}
mata[0]["SizeGuide"]["XXL"]["Chest cm"] = [118, 119, 120, 121, 122, 123, 124, 125, 126]
mata[0]["SizeGuide"]["XXL"]["Waist cm"] = [107, 108, 109, 110, 111, 112, 113, 114, 115, 116]
mata[0]["SizeGuide"]["XXL"]["Neckline cm"] = [44, 45]
mata[0]["SizeGuide"]["XXL"]["Armlength cm"] = [65, 66]
mata[0]["SizeGuide"]["XXL"]["Associated Sizes"] = {"EUR" : [60, 62], "US" : ["50R", "52R"]}
mata[0]["SizeGuide"]["XXL/L"]["Chest cm"] = [118, 119, 120, 121, 122, 123, 124, 125, 126]
mata[0]["SizeGuide"]["XXL/L"]["Waist cm"] = [107, 108, 109, 110, 111, 112, 113, 114, 115, 116]
mata[0]["SizeGuide"]["XXL/L"]["Neckline cm"] = [44, 45]
mata[0]["SizeGuide"]["XXL/L"]["Armlength cm"] = [68, 69]
mata[0]["SizeGuide"]["XXL/L"]["Associated Sizes"] = {"US" : ["50L", "52L"]}
mata[0]["SizeGuide"]["3XL"]["Chest cm"] = [126, 127, 128, 129, 130, 131, 132, 133, 134]
mata[0]["SizeGuide"]["3XL"]["Waist cm"] = [116, 117, 118, 119, 120, 121, 122, 123, 124, 125]
mata[0]["SizeGuide"]["3XL"]["Neckline cm"] = [46, 47]
mata[0]["SizeGuide"]["3XL"]["Armlength cm"] = [66]
mata[0]["SizeGuide"]["3XL"]["Associated Sizes"] = {"EUR" : [64, 66], "US" : ["54R", "56R"]}
mata[0]["SizeGuide"]["3XL/L"]["Chest cm"] = [126, 127, 128, 129, 130, 131, 132, 133, 134]
mata[0]["SizeGuide"]["3XL/L"]["Waist cm"] = [116, 117, 118, 119, 120, 121, 122, 123, 124, 125]
mata[0]["SizeGuide"]["3XL/L"]["Neckline cm"] = [46, 47]
mata[0]["SizeGuide"]["3XL/L"]["Armlength cm"] = [69]
mata[0]["SizeGuide"]["3XL/L"]["Associated Sizes"] = {"US" : ["54L", "56L"]}

mata[1]["SizeGuide"]["XS"]["Waist cm"] = [66, 67, 68, 69, 70, 71, 72, 73, 74]
mata[1]["SizeGuide"]["XS"]["Lop Hip cm"] = [85, 86, 87, 88, 89, 90, 91]
mata[1]["SizeGuide"]["XS"]["Inside leg length cm"] = [80, 81]
mata[1]["SizeGuide"]["XS"]["Associated Sizes"] = {"US" : ["26R", "28R"]}
mata[1]["SizeGuide"]["XS/L"]["Waist cm"] = [66, 67, 68, 69, 70, 71, 72, 73, 74]
mata[1]["SizeGuide"]["XS/L"]["Lop Hip cm"] = [85, 86, 87, 88, 89, 90, 91]
mata[1]["SizeGuide"]["XS/L"]["Inside leg length cm"] = [84, 85]
mata[1]["SizeGuide"]["XS/L"]["Associated Sizes"] = {"US" : ["26L", "28L"]}
mata[1]["SizeGuide"]["S"]["Waist cm"] = [74, 75, 76, 77, 78, 79, 80, 81, 82]
mata[1]["SizeGuide"]["S"]["Lop Hip cm"] = [91, 92, 93, 94, 95, 96, 97]
mata[1]["SizeGuide"]["S"]["Inside leg length cm"] = [81, 82]
mata[1]["SizeGuide"]["S"]["Associated Sizes"] = {"US" : ["30R", "32R"]}
mata[1]["SizeGuide"]["S/L"]["Waist cm"] = [74, 75, 76, 77, 78, 79, 80, 81, 82]
mata[1]["SizeGuide"]["S/L"]["Lop Hip cm"] = [91, 92, 93, 94, 95, 96, 97]
mata[1]["SizeGuide"]["S/L"]["Inside leg length cm"] = [85, 86]
mata[1]["SizeGuide"]["S/L"]["Associated Sizes"] = {"US" : ["30L", "32L"]}
mata[1]["SizeGuide"]["M"]["Waist cm"] = [82, 83, 84, 85, 86, 87, 88, 89, 90]
mata[1]["SizeGuide"]["M"]["Lop Hip cm"] = [97, 98, 99, 100, 101, 102, 103]
mata[1]["SizeGuide"]["M"]["Inside leg length cm"] = [82, 83]
mata[1]["SizeGuide"]["M"]["Associated Sizes"] = {"US" : ["33R", "34R"]}
mata[1]["SizeGuide"]["M/L"]["Waist cm"] = [82, 83, 84, 85, 86, 87, 88, 89, 90]
mata[1]["SizeGuide"]["M/L"]["Lop Hip cm"] = [97, 98, 99, 100, 101, 102, 103]
mata[1]["SizeGuide"]["M/L"]["Inside leg length cm"] = [86, 87]
mata[1]["SizeGuide"]["M/L"]["Associated Sizes"] = {"US" : ["33L", "34L"]}
mata[1]["SizeGuide"]["L"]["Waist cm"] = [90, 91, 92, 93, 94, 95, 96, 97, 98]
mata[1]["SizeGuide"]["L"]["Lop Hip cm"] = [103, 104, 105, 106, 107, 108, 109]
mata[1]["SizeGuide"]["L"]["Inside leg length cm"] = [83, 84]
mata[1]["SizeGuide"]["L"]["Associated Sizes"] = {"US" : ["36R", "38R"]}
mata[1]["SizeGuide"]["L/L"]["Waist cm"] = [90, 91, 92, 93, 94, 95, 96, 97, 98]
mata[1]["SizeGuide"]["L/L"]["Lop Hip cm"] = [103, 104, 105, 106, 107, 108, 109]
mata[1]["SizeGuide"]["L/L"]["Inside leg length cm"] = [87, 88]
mata[1]["SizeGuide"]["L/L"]["Associated Sizes"] = {"US" : ["36L", "38L"]}
mata[1]["SizeGuide"]["XL"]["Waist cm"] = [98, 99, 100, 101, 102, 103, 104, 105, 106, 107]
mata[1]["SizeGuide"]["XL"]["Lop Hip cm"] = [109, 110, 111, 112, 113, 114, 115]
mata[1]["SizeGuide"]["XL"]["Inside leg length cm"] = [84]
mata[1]["SizeGuide"]["XL"]["Associated Sizes"] = {"US" : ["40R", "42R"]}
mata[1]["SizeGuide"]["XL/L"]["Waist cm"] = [98, 99, 100, 101, 102, 103, 104, 105, 106, 107]
mata[1]["SizeGuide"]["XL/L"]["Lop Hip cm"] = [109, 110, 111, 112, 113, 114, 115]
mata[1]["SizeGuide"]["XL/L"]["Inside leg length cm"] = [88]
mata[1]["SizeGuide"]["XL/L"]["Associated Sizes"] = {"US" : ["40L", "42L"]}
mata[1]["SizeGuide"]["XXL"]["Waist cm"] = [107, 108, 109, 110, 111, 112, 113, 114, 115, 116]
mata[1]["SizeGuide"]["XXL"]["Lop Hip cm"] = [115, 116, 117, 118, 119, 120, 121]
mata[1]["SizeGuide"]["XXL"]["Inside leg length cm"] = [85]
mata[1]["SizeGuide"]["XXL"]["Associated Sizes"] = {"US" : ["44R", "46R"]}
mata[1]["SizeGuide"]["XXL/L"]["Waist cm"] = [107, 108, 109, 110, 111, 112, 113, 114, 115, 116]
mata[1]["SizeGuide"]["XXL/L"]["Lop Hip cm"] = [115, 116, 117, 118, 119, 120, 121]
mata[1]["SizeGuide"]["XXL/L"]["Inside leg length cm"] = [89]
mata[1]["SizeGuide"]["XXL/L"]["Associated Sizes"] = {"US" : ["44L", "46L"]}
mata[1]["SizeGuide"]["3XL"]["Waist cm"] = [116, 117, 118, 119, 120, 121, 122, 123, 124, 125]
mata[1]["SizeGuide"]["3XL"]["Lop Hip cm"] = [121, 122, 123, 124, 125, 126, 127]
mata[1]["SizeGuide"]["3XL"]["Inside leg length cm"] = [85]
mata[1]["SizeGuide"]["3XL"]["Associated Sizes"] = {"US" : ["48R", "50R"]}
mata[1]["SizeGuide"]["3XL/L"]["Waist cm"] = [116, 117, 118, 119, 120, 121, 122, 123, 124, 125]
mata[1]["SizeGuide"]["3XL/L"]["Lop Hip cm"] = [121, 122, 123, 124, 125, 126, 127]
mata[1]["SizeGuide"]["3XL/L"]["Inside leg length cm"] = [89]
mata[1]["SizeGuide"]["3XL/L"]["Associated Sizes"] = {"US" : ["48L", "50L"]}

with open("WomenHM.json", "w") as i :
   json.dump(wata, i, indent=4)

with open("MenHM.json", "w") as i :
   json.dump(mata, i, indent=4)
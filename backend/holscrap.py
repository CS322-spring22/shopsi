from textwrap import indent
from selenium import webdriver
from bs4 import BeautifulSoup
from time import sleep
import json
from selenium.webdriver.common.by import By

#scrape the data
options = webdriver.ChromeOptions() 
options.add_argument('--disable-blink-features=AutomationControlled')
driver = webdriver.Chrome(options=options)
driver.delete_all_cookies()
driver.get("https://www.hollisterco.com/shop/us")
driver.find_element_by_xpath('//*[@id="site-cookie-banner"]/div/div/button[1]').click()
driver.find_element_by_xpath('//*[@id="cat-label-12552"]').click()
driver.find_element_by_xpath('//*[@id="cat-166318_l2"]/a').click()
sleep(2)
driver.find_element_by_xpath('//*[@id="p-48918396"]/div/div[2]/div[1]/a').click()
sleep(1)
driver.execute_script("window.scrollBy(0,500)","")
sleep(1)
driver.find_element_by_css_selector('body > main > section.product-page-v2-modules.product.no-linkify.catalog-v2.js-product-page.product_429975 > section.product-page__main-container.scope-1892 > section.product-page__info-container > div > form > div.js-product-attributes-inline > div > div.product-size-selection-header_wrapper > div > button')
sleep(5)
driver.close()
#organize the data

#dump the data
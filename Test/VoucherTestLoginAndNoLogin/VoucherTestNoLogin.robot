*** Settings ***
Library    SeleniumLibrary

*** Test Cases ***
TC01 : Open Form
    Open Browser    http://localhost:8080/en
    Log    This is executed.
    Capture Page Screenshot    TC01.jpg     

#Login Success
#    Input text    email    punpun@gmail.com      
#    Input text    password    ilovesofteng
#    Click Button    submit-login
#    Location Should Be    http://localhost:8080/en/

TC02 : Click Voucher
    Click Element    //*[@id="content"]/section/div/div[5]/article/div/div[1]/a/picture/img
    Location Should Be    http://localhost:8080/en/ticket/26-voucher-100.html

TC03 : Click Buy
    Click Element    //*[@id="add-to-cart-or-refresh"]/div[2]/div/div[2]/button
    Sleep    1s
    Click Element    //*[@id="blockcart-modal"]/div/div/div[2]/div/div[2]/div/div/a
    Location Should Be    http://localhost:8080/en/cart?action=show
    Capture Page Screenshot    TC02.jpg    

TC04 : Click ProceedToCheckOut
    Click Element    //*[@id="main"]/div/div[2]/div[1]/div[2]/div/a
    Location Should Be    http://localhost:8080/en/order
    Capture Page Screenshot    TC03.jpg    

TC05 : Write Information
    Input text    firstname    nueafa      
    Input text    lastname    nueafa
    Input text    email        wowzatest@gmail.com
    Input text    password    ilovesofteng
    Input text    birthday    01/01/1997
    Select CheckBox    psgpdpr
    Click Button    continue
    #Input text    address1    019 หมู่ 6
    #Input text    city    เมือง
    #Select From List By Value    id_country    204
    #Input text    postcode    40000

TC06 : Click Confirm
    Sleep    3s
    Click Button    confirm-addresses
        Sleep    1s
    Click Button    confirmDeliveryOption
    click element    //*[@id="payment-option-2"]
    Select CheckBox    //*[@id="conditions_to_approve[terms-and-conditions]"]
    Click Element    //*[@id="payment-confirmation"]/div[1]/button
    Should Be Equal As Strings    YOUR ORDER IS CONFIRMED    YOUR ORDER IS CONFIRMED
    Sleep    2s
    Capture Page Screenshot    TC06.jpg
    [Teardown]    Close Browser

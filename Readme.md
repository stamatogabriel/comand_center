# Comand Center
*Comand Center* is an API for controlling emails and SMS messages.

With an administrator password, you can search the emails and sms sent per period and consult the costs per period.

## Instalation
 - Clone this repo in your device.
 - Open the folder by your terminal and type one of the commands below

`yarn`, 
or
`npm install`

Done that, run one of the commands below:

`yarn start`, 
or
`npm start`

Note: Must have NodeJs installed

## Authorization

### Create User
Only users with administrator privilege can create other users in the API.

Use route '/user' with POST method to register a new user. Use a JSON pattern like the template below.

    `{ 
        "name":"Gabriel Stamato", 
        "email": "stamato7@gmail.com", 
        "password": "123456" 
        }`

Notes: *Comand Center* uses encryption for password storage provided.

### Auth
The user can login at any time, through previously registered email and password (see Create User)

Use route '/auth' to login with POST method. Use a JSON pattern like the template below.

    `{ 
        "email": "stamato7@gmail.com", 
        "password": "123456" 
    }`

*Comand Center* returns a token jwt so that it ca acces the order functionalities.

Notes: The jwt token lasts only for 1 day. After that you will need to log in again.

### SMS
Any user can send SMS messages via route '/ send_sms' using the JSON template below:

    `{
        "to": ["5519994825767", "5519993259197"],
        "msg": "Mensagem de teste"
    }`


As you can see in the example, you can send messages to multiple numbers using an array to send the numbers to the API.

If you have administrator privileges, you can search for messages sent within a certain period, whether or not you can define the department that forwarded the messages.

    `{
        "initialDate": "2019-07-03",
        "lastDate": "2019-07-09"
    }`

    `{
        "initialDate": "2019-07-03",
        "lastDate": "2019-07-09",
        "department": "Diretoria"
    }`

    `{
        "initialDate": "2019-07-03",
        "lastDate": "2019-07-09",
        "department": 100010
    }`


As you can see in the examples, you can search the department by Name or by Code of Cost Center.

### Email
Any user can send Email messages via route '/ send_email' using the JSON template below:

    `{
        "to": ["stamato7@gmail.com", "gabrielstamato@hotmail.com", "joao@gmail.com"],
        "priority": "normal",
        "msg":"essa é uma mensagem de texto de envio de email para vários emails"
    }`


As you can see in the example, you can send messages to multiple emails using an array to send the emails to the API.

The priority item can be set to `high`, `normal` or `low`.

If you have administrator privileges, you can search for messages sent within a certain period, whether or not you can define the department that forwarded the messages.

    `{
        "initialDate": "2019-07-03",
        "lastDate": "2019-07-09"
    }`

    `{
        "initialDate": "2019-07-03",
        "lastDate": "2019-07-09",
        "department": "Diretoria"
    }`

    `{
        "initialDate": "2019-07-03",
        "lastDate": "2019-07-09",
        "department": 100010
    }`


As you can see in the examples, you can search the department by Name or by Code of Cost Center.

### Billing
The user who has administrator privilege can check the costs of message submissions by department, informing the data via JSON, as in the example below, through the '/ billing' route via the GET method.

    `{
        "initialDate": "2019-07-03",
        "lastDate": "2019-07-09",
        "department": 100013
    }`

The API returns the cost information in JSON format, as shown in the example below:

    `{
        "costsByDepartment": {
            "codCostCenter": 100013,
            "costCenterDescription": "Desenvolvimento",
            "qntEmails": 0,
            "totalCostEmails": "0.00",
            "qntSms": 32,
            "totalCostSms": "6.40",
            "totalCost": "6.40"
        }
    }`

You can search the department by Name or by Code of Cost Center.
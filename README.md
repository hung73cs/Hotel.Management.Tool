Project is small tool to manage room lease in hotel. User register with primary account, can be add new room type, room, customer type, customer, new order... View list of them and perform update, delete data. Data will be change and save to DB. Project have many user type, Admin is full permision user.
This repo contain back-end and front-end. 

-	Back-end: using ASP.NET Core 3.1, Entity Framework Core (code first) with PostgreSQL, apply dependency injection, asynchronous, validate input data with FluentValidation, route, mapper, middleware.
-	Front-end: using ReactJS, Redux thunk, call API by RESTful, authen and authod to back-end by JWT token.
Project apply asynchronous

Database Diagram. 
![image](https://user-images.githubusercontent.com/46376034/213636977-eb0904a9-63ad-4841-93cb-3f83a1cc1df6.png)


Some pages of tool.

Login form 
![image](https://user-images.githubusercontent.com/46376034/213636727-e5f2467e-fb7a-4ff9-a50c-7fc184965deb.png)

Change password
![image](https://user-images.githubusercontent.com/46376034/213636788-0dfa1077-2e9c-49bf-8b6f-4901fab488e8.png)

Dashboard
![image](https://user-images.githubusercontent.com/46376034/213622831-c7071a96-3d59-4d5f-b014-a8a2caa34302.png)

Create room lease
![image](https://user-images.githubusercontent.com/46376034/213635863-2caa9316-5212-4776-a187-195dd6478d1e.png)

List of room leases
![image](https://user-images.githubusercontent.com/46376034/213635928-071f149c-5eef-4a60-bfd7-acd677bc1a07.png)

Room lease detail
![image](https://user-images.githubusercontent.com/46376034/213636025-82095060-5c17-4c50-8000-556f0d35535d.png)

Create order
![image](https://user-images.githubusercontent.com/46376034/213636102-c53b1cd8-2d00-4d85-8c9e-e3fa23457ae1.png)

List of orders
![image](https://user-images.githubusercontent.com/46376034/213636157-0909862a-78f6-45a7-b504-85c0488cc035.png)

Add new room
![image](https://user-images.githubusercontent.com/46376034/213636227-5c0b820e-473e-42de-9b88-a7edd33806b6.png)

Add new account
![image](https://user-images.githubusercontent.com/46376034/213636318-b436f8a2-6027-482e-960c-232d063d4112.png)

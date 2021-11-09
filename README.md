# LocalCommunityVotingPlatform

LocalCommunityVotingPlatform is an application dedicated to local communities that allows them to conduct votes on the resolutions they create.

The application consists of an API based on .NET Core Web API and a UI based on React.js framework. 
Application data is stored in MS SQL Server database. Access to the data is realized by Entity Framework Core.
ASP.NET Core Identity was used to manage users and their roles along with a JWT token-based authentication method.

The application provides the following functionalities for the different aspects of the system:

1. Users and their accounts
+ account creation
+ logging in
+ reset of a forgotten password
+ changing personal data
+ changing password
+ deleting user account

2. Community resolutions
+ creating a new resolution
+ editing an existing resolution
+ listing of active resolutions (for which voting has not been completed)
+ listing of expired resolutions
+ deleting resolutions
+ displaying details of a particular resolution

3. Voting on active resolutions
+ casting a vote on the individual resolution - for / against / abstained
+ generation of ballots (ready to print) with grouped resolutions
+ presentation of voting results on resolution details panel with annotation about users who did not participate in voting

The above-mentioned functionalities are intended for users who were divided into the following roles: Administrator and Local Community Member:
1. The administrator creates user accounts and can manage them, including editing. The administrator also manages the whole process related to creating new resolutions, managing them and voting on them. The administrator role account cannot participate in voting intended for local community users. 
2. Users in the local community member role have access to active and archived resolutions, can cast their votes, and can view the voting results. However, they cannot directly edit their user account data (does not apply to changing the password).

Login form:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_9.PNG "Login form")

Reset user password form:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_10.PNG "Reset user password form")

Add new user form:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_1.PNG "Add new user form")

User account registration email confirmation with temporary password:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_12.PNG "Registration confirmation email")

Users list:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_2.PNG "Users list")

Edit user form:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_3.PNG "Edit user")

Delete user modal:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_4.PNG "Delete user modal")

User account data:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_5.PNG "User data")

Change logged user password form:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_6.PNG "Change logged user password")

Resolutions list:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_7.PNG "Resolutions list")

Add new resolution form:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_8.PNG "Add new resolution form")

Active resolutions list:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_13.PNG "Active resolutions list")

Generated voting ballot:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_11.PNG "Voting ballot")

Resolution details with voting in progress (logged-in user has not cast his vote):

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_14.PNG "Resolution details without vote")

Resolution details with voting results:

![alt text](https://github.com/Korag/DocumentationImages/blob/master/LocalCommunityVotingPlatform/LocalCommunityVotingPlatform_15.PNG "Resolution details with voting results")

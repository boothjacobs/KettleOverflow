# Kettle Overflow


![Screen Shot 2021-05-07 at 1 54 42 PM](https://user-images.githubusercontent.com/75630072/117512956-80984880-af45-11eb-856f-fa2380f842ed.png)

 [Kettle Overflow](https://kettle-overflow.herokuapp.com/)

# Summary

[Kettle Overflow](https://kettle-overflow.herokuapp.com/) is a web application inspired by Stack Overflow built using JavaScript using Express for the back end and Pug for the front end. Kettle Overflow allows users to:
-   Create an account
![Screen Shot 2021-05-07 at 1 57 12 PM](https://user-images.githubusercontent.com/78223925/117514226-feb21a80-af58-11eb-8fb9-a67ea7673c06.png)
-   Log in / Log out
![Screen Shot 2021-05-07 at 1 57 01 PM](https://user-images.githubusercontent.com/78223925/117514158-d5918a00-af58-11eb-9b74-0cc3635d8a9f.png)
-   Ask questions about Tea
![Screen Shot 2021-05-07 at 1 57 33 PM](https://user-images.githubusercontent.com/78223925/117514335-2ef9b900-af59-11eb-954a-98508b87a4a6.png)
-   Answer questions about Tea
-   Edit either questions or answers that belong to the user
-   Delete answers that belong to the user
-   Search for a question using the search bar
![Screen Shot 2021-05-07 at 1 56 25 PM](https://user-images.githubusercontent.com/78223925/117514392-53559580-af59-11eb-8c74-66e0ff89a566.png)

## Technologies Used

-   Express
-   Heroku
-   PostgreSQL
-   BCrypt 
-   Pug

## Planning Stage

- We planned out our [database](https://github.com/boothjacobs/KettleOverflow/wiki/Database-Schema)  making sure that we made deliberate choices on which models were connected.
- We wrote the [API routes](https://github.com/boothjacobs/KettleOverflow/wiki/API-Documentation) using RESTful naming conventions.
- We talked through what we wanted the user experience to be. 
	- We made a deliberate choice to not let users delete questions.
	- We created a [feature list](https://github.com/boothjacobs/KettleOverflow/wiki/Feature-List) that walks through how the user interacts with the features we planned to create.
	- We wrote the [frontend routes](https://github.com/boothjacobs/KettleOverflow/wiki/Frontend-Routes)with the user experience in mind.

## Future Features

-	Customizable profile for each account including profile photos
-	Organizing questions into categories
	-	Tags attached to each question
-	Option to share images/videos in both questions and answers
-	Comments on Answers
-	Search result page includes up votes/down votes


## Particular Challenges

### Sarah: 

Implementing upvotes/downvotes turned out to be a massive project, involving 140 lines of JavaScript, five helper functions, and database calls in three different route handlers. 

### Lauren's Challenge
In the event listener I wrote for the Edit Answer button, I found it difficult to grab both the ID and content of specific answers in the database. The answer content was being populated on the page through iteration in the pug file. This made it so there weren't specific classes or ids for each answer, so I set an id of "answer.id" on the edit button, and used event.target.id to grab the answer ID. To grab the correct answer content, I saved event.path[1].children[0] to a variable and then split that variable on the section of the innerHTML that started with "<". I assigned the split variable to "contentSplit" and then reassigned the textarea innerHTML to contentSplit[0].

Grabbing the corrent answer ID and content
<img width="500" alt="Screen Shot 2021-05-07 at 2 13 49 PM" src="https://user-images.githubusercontent.com/68528608/117509727-9c98eb80-af3f-11eb-8c4a-730143ec887b.png">

Assigning the correct content to the textarea
<img width="509" alt="Screen Shot 2021-05-07 at 2 14 03 PM" src="https://user-images.githubusercontent.com/68528608/117509744-a1f63600-af3f-11eb-9459-10f204a09903.png">

### Drew:

This was the first time that we had to update the database using a PUT request, so we had difficulty connecting the request to the route that is in our express file. We found that the content we were trying to send was located on the req.body because it is sent in the PUT request's body.

> Fetch request: 
![fetch-put](https://user-images.githubusercontent.com/78223925/117510133-23a28f80-af51-11eb-9312-5570b093592e.PNG)


> PUT router: 
![router-put](https://user-images.githubusercontent.com/78223925/117510175-37e68c80-af51-11eb-8034-bb84bb78cde3.PNG)


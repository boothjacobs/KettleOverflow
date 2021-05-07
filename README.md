# Kettle Overflow


Picture of home page

 [Kettle Overflow](https://kettle-overflow.herokuapp.com/)

# Summary

[Kettle Overflow](https://kettle-overflow.herokuapp.com/) is a web application inspired by Stack Overflow built using JavaScript using Express for the back end and Pug for the front end. Kettle Overflow allows users to:
-   Create an account
-   Log in / Log out
-   Ask questions about Tea
-   Answer questions about Tea
-   Edit either questions or answers that belong to the user
-   Delete answers that belong to the user

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

Implementing upvotes/downvotes turned out to be a massive project, involving 140 lines of JavaScript, five helper functions, and database calls in three different route handlers. In order to display up-to-date vote tallies on the question pages, I ultimately built an object to store the result of the database calls in the route handler and passed it to the Pug file, while executing an explicit res.send command in the /votes post route to update the page in real time. The biggest issue was communicating data between Express routes, backend JavaScript, and Pug files.
   
> Sequelize helper function: 
![Screen Shot 2021-05-07 at 2 15 38 PM](https://user-images.githubusercontent.com/75630072/117509285-cf8eaf80-af3e-11eb-8bae-26dc111c4e81.png)
	
>In the GET call to display a question:
   ![Screen Shot 2021-05-07 at 2 15 24 PM](https://user-images.githubusercontent.com/75630072/117509241-c271c080-af3e-11eb-9031-5e9ed432fd52.png)

>In the Pug mixin: ` #{answerVotes[answerId].length}`
>

### Lauren's Challenge
In the event listener I wrote for the Edit Answer button, I found it difficult to grab both the ID and content of specific answers in the database. The answer content was being populated on the page through iteration in the pug file. This made it so there weren't specific classes or ids for each answer, so I set an id of "answer.id" on the edit button, and used event.target.id to grab the answer ID. To grab the correct answer content, I saved event.path[1].children[0] to a variable and then split that variable on the section of the innerHTML that started with "<". I assigned the split variable to "contentSplit" and then reassigned the textarea innerHTML to contentSplit[0].

<img width="500" alt="Screen Shot 2021-05-07 at 2 13 49 PM" src="https://user-images.githubusercontent.com/68528608/117509727-9c98eb80-af3f-11eb-8c4a-730143ec887b.png">
<img width="509" alt="Screen Shot 2021-05-07 at 2 14 03 PM" src="https://user-images.githubusercontent.com/68528608/117509744-a1f63600-af3f-11eb-9459-10f204a09903.png">


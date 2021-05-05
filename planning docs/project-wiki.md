Feature List
## 1. Login, sign up
* Users must be logged in to ask or answer a question
* Home page for unlogged in users
* On logging in, users are redirected to their previous page
* Bonus: customizable profile for each account

## 2. Ask Questions
* Logged in users can post a question using a text editor.
* The user that created the question can edit: Stack Overflow does not allow deletion of questions for archival purposes
* Bonus: categories/tags
* Bonus: code snippets/images?

## 3.Answer Questions
* Logged in users can post an answer (reply) to a question
* The user that created the answer can edit and delete it
* Reply threads--bonus? Requires a join table?
* Bonus: answer as a guest

## 4. Search Question
* Anyone can search and read questions
* Search results page is limited to 10 results per page

## 5. Upvote/Downvote Answer
* Logged in users can up- or downvote an answer
* The user that voted can remove their vote
* All users can see number of votes on a post



User Stories
## Sign Up
* As an unregistered user, I want to access a sign-up form so that I can register myself.
* On the /signup page:
    1. I want to easily enter my email, username, and password.
    2. I want to be logged in at submission.
* When I enter invalid data:
    1. I would like to be informed about what information I need to alter.
    2. I would like to be redirected back to the form.

## Log In
* As a registered but unverified user, I want to access a log-in form.
* On the /login page:
    1. I want to easily enter my username and password.
    2. I want to be logged in at submission.
* When I enter invalid data:
    1. I would like to be informed about what information I need to alter.
    2. I would like to be redirected back to the form.

## Ask A Question
* As a registered and verified user I would like to ask my question.
* On the /question page:
    1. I want to fill out a question-form.
    2. I want to submit my question.
* On the /question/:id page:
    1. As the owner of the post, I want to click a button to edit my question if I made a mistake.
    2. I want to make my edit and update the post.

## Answer A Question
* As a registered and verified user I would like to answer a question.
* On the /question/:id page:
    1. I want to fill out an answer-form.
    2. I want to submit my answer.
* After submitting:
    1. As the owner of the answer post, I want to click a button to edit my answer if I made a mistake.
    2. I want to make my edit and update the post.
    3. As the owner of the answer post, I want to delete my answer.
    4. I want to be asked if I am certain that I want to delete my answer.
    5. I want my answer to disappear.

## Search A Topic
* As a user I would like to search for a specific topic.
* On the navigation bar:
    1. I want to type in the topic I am interested in.
    2. I want to submit a request to search for that topic.
* On the /results page:
    1. I want to see a page that has up to 10 results for that search.
    2. I want to select the result I am interested in and be redirected to that question.

## Upvote/Downvote
* As a user I want to either upvote or downvote on either/both a post and/or an answer.
* On the /question/:id page:
    1. I want to click an upvote/downvote button.
    2. As the owner of the vote, I want to remove my vote from the post.

## Log Out
* As a registered and verified user I would like to log out of my account.
* On the navigation bar:
    1. I want to click a logout button.
    2. I want to be asked if I am certain I want to log out in case I clicked accidentally.
    3. I want to be redirected to the home page.



Database Schema
# Database Schema

***
## `user`

***
| Column Name      | Data Type| details  |
| ----------- | ----------- | -----------|
| id      | integer      |      not null, primary key      |
| username   | string        |   not null         |
| email   | string        |   not null, indexed, unique         |
| hashed password | string | not null |
| created-at   | datetime       |   not null         |
| updated-at   | datetime        |   not null         |

## `questions`
***
| Column Name | Data Type | Details |
| ----------- | --------- | ------- |
| id          | integer   | not null, primary key |
| content     | string    | not null |
| userId      | integer   | not null, foreign key |
| created-at  | datetime  | not null |
| updated-at  | datetime  | not null |

## `answers`
***
| Column Name | Data Type | Details |
| ----------- | --------- | ------- |
| id          | integer   | not null, primary key |
| content     | string    | not null |
| userId      | integer   | not null, foreign key |
| questionId  | integer   | not null, foreign key |
| created-at  | datetime  | not null |
| updated-at  | datetime  | not null |

## `questionVote`
***
| Column Name | Data Type | Details |
| ----------- | --------- | ------- |
| id          | integer   | not null, primary key |
| upVote      | boolean   |  not null |
| userId      | integer   | not null, indexed, foreign key |
| questionId  | integer   | indexed, foreign key |

## `answerVote`
***
| Column Name | Data Type | Details |
| ----------- | --------- | ------- |
| id          | integer   | not null, primary key |
| upVote      | boolean   |  not null |
| userId      | integer   | not null, indexed, foreign key |
| answerId    | integer   | indexed, foreign key |



API Documentation
# API-Routes

## Answers
DELETE (to remove answer)
   * /answers/:id

## Question-Vote
POST (to create new vote--up vs down represented by a Boolean)
   * /questions/:id/upVotes

DELETE (to remove vote)
   * /questions/:id/upVotes

## Answer-Vote
POST (to create new vote)
   * /answers/:id/upVotes

DELETE (to remove vote)
   * /answers/:id/upVotes


Front End Routes
# User-Facing Routes

***
## `/`

Display most recent questions or highest liked questions based off of filter, as well as log-in or sign-up if needed. Will also have a button to post a question and a search bar.
 * `GET /`

***
## `/login`

Display a log-in form for user.
 * `GET /users/login`
 * `POST /users/login`

***
## `/signup`
Display a sign-up form for the user.
 * `GET /users/signup`
 * `POST /users/signup`
***
As a possible bonus feature, display an "edit profile" form for the user to update their information.
* `GET /users/:id`
* `PUT /users/:id`

***
## `/questions`

Display a post question form for the user and a search bar above all posted questions.
 * `GET /questions`
 * `POST /questions`

***
## `/questions/:id`
Displays a selected question to user, as well as provide an answer form to respond to. If the current user is the owner of that question (or answer), they can edit it.
 * `GET /questions/:id`
 * `PUT /questions/:id`
 * `POST /answers`
 * `PUT /answers/:id`

Features a button to allow a user to delete an answer they've posted.
Also allows the user to upvote/downvote the question or any of the answers corresponding to it.

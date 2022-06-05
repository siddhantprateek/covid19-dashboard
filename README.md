<h1 align="center">Covy App</h1>


![](./assets/dashboard.png)
![](./assets/summary.png)
![](./assets/news.png)

## Frontend Features

1. In dashboard where users can see the total covid cases worldwide of different status like `Active`, `Recovered` and `Deceased`.
2. To give a better understanding of the same add a graph of time vs cases.
3. The dashboard have filters of date and the data shown on the page should change according to the filters applied.

## Project Routes

| Routes | Description |
| -------- | -------- | 
| `/` | UI Dashboard |
| `/news`     | Fetch's news articles |
| `/graphql` | route to Graphql |
| `/country/:slug/from/:fromdate/to/:todate` | Fetch data covid report providing country's name, from date and to date as parameters |
| `/country/:countryslug` | Returns all the available countries and provinces, as well as the country slug for per country requests. |
| `/summary` | A summary of new and total cases per country updated daily. |
| `/world` | Returns overall cases worldwide |



#### Countrywise status table

1. Create a table to list status of total covid cases for countries with the following columns (you may add more columns) :
* Name (country name)
* Confirmed (total confirmed cases)
* Recovered (total number of recovered cases)
* Deceased (total number of deceased cases)

2. Users should be able to search with the country name in the table, no result found message should appear under the search box for no matches found with search string typed in the search box.
## Setting up locally

* To run the application on your local system, first we need to clone it.
```shell
git clone https://github.com/siddhantprateek/covid19-stats.git
cd covid19-stats
```

* After cloning the repository, install all the required dependencies 

```shell

npm install # in root folder to install dependencies for backend
cd client && npm install # install dependencies for frontend 

```

* Now, for running the application, make sure that the production url and uri are changed to developement url and uri. To do that look for commented url and uri in application and replace them with developement url. After doing that, at your root folder run

```shell
npm run server

# in other shell
npm run client
```
### Targets
- [x] Use Graphql for fetching data on the frontend.
- [x] Add authentication for logging in to the app.
- [ ] Use typescript instead of js as the primary language for the app.
### My Learnings from this Assignment

* Since this was my first time using GraphQL, I have learn't, how to setup and how to query data from GraphQL. I probably I won't be using REST Api for a while.
* I was not able to typescript, because I have very less expericence in using typescript, It's type check gives me really a hard time, but I'm still learning and exploring it, I hope in future i completely transition into typescript.






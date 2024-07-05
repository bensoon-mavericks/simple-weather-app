# Simple Weather App

A simple weather app using NextJS.

## Setup

- `npm install`
- `npm run dev`

Visit the localhost domain displayed in the console e.g. `http://localhost:3000` and you should see this:

<img width="1512" alt="Screenshot of index" src="https://github.com/yapyuyou/simple-weather-app/assets/31716292/1fb2cbe0-9c63-4d95-91a2-e09efcc60230">

---

## Tasks

### 1. Something is wrong with the "Now" page and there have been user reports that the weather information does not appear. Investigate and rectify the problem.

#### Wrong response code

Currently, the "Now" page (`now.tsx`) makes a call to the `/api/now` endpoint, which then subsequently calls the <https://birdsofaweather.netlify.app/api/weather/now> url. This `/api/now` endpoint returns a `200` status code regardless of whether or not the API call was successful. However, the <https://birdsofaweather.netlify.app/api/weather/now> URL call seems to fail for every 3-4 successful calls.

![Screenshot 2024-07-05 at 12 15 13 PM](https://github.com/bensoon-mavericks/simple-weather-app/assets/171893210/a4c0d6d3-cc96-40b8-9403-0e3ce0726047)

Subsequently, if a call to the URL fails at the `/api/now` endpoint, the response is returned to the frontend as successful however there is no weather data in the response, which then causes the cards to disappear. So in our `/api/now`, we should be returning a more appropriate status code to indicate that there has been an error in making the call to the backend.

#### Retry on error

Another problem with the current implementation in `now.tsx` is that if the call to the url above fails, it doesn't do a retry of the fetch to get the weather data due to `now.tsx`'s usage of `useEffect` to fetch the data when the component is mounted onto the page, which leaves the "Now" page in an empty state with no weather data, which will be confusing for the user.

To rectify this problem, we should have a way to retry the fetch on error and also signal to the user that the page is still attempting to retrieve the data from the backend.

One way we can enable our `now.tsx` page to retry on error is by using a library such as SWR to add hooks for our API calls. With SWR, we can now detect whether or not an error has occurred in our backend and attempt to retry fetching from the URL. 

With SWR, it is able to detect whether or not our component is currently in the midst of fetching the data from the backend as well and whether it's in the midst of loading the data into our component. 

Given that we can check the request has failed and if the component is still loading, and also that eventually the call to the URL might succeed, we could consider showing a skeleton of our Card component with a shimmer effect to indicate to the user that we're attempting to load the data from the backend into our page.

https://github.com/bensoon-mavericks/simple-weather-app/assets/171893210/9c3e75e7-5bd5-479a-8f42-4bde7f9436a1


### 2. Implement the "Forecast" page to display the next 4 days of weather information similar to the "Now" page. You can also improve it as you see fit.

#### Routing

This project is a NextJS project and it uses Page Router to handle the routing for the pages. All we need to do is create a new file titled `forecast.tsx` under the pages folder, and then in our "Home" page, we need to add an entrypoint into this new "Forecast" page by invoking `router.push("/forecast")` on the button with the "Forecast" text. This will route the application to the "Forecast" page when the user clicks on the "Forecast" button in the "Home" page.

For most of the HTML and CSS for this new "Forecast" page, it is similar to the "Now" page, with some minor changes to the text and the data returned from the backend.

#### Different data from "Now"

The data returned from the <https://birdsofaweather.netlify.app/api/weather/forecast> url is like the example below:
```
{"items":[{"date":"2024-07-06","prediction":"Afternoon thundery showers"},{"date":"2024-07-07","prediction":"Afternoon thundery showers"},{"date":"2024-07-08","prediction":"Afternoon thundery showers"},{"date":"2024-07-09","prediction":"Morning thundery showers"}]}
```
As such, we want to be able to reuse our Card component so that we can use it to display both our data in the "Now" and "Forecast" page. One way we could do this is by changing the `weatherdata` field in the `CardProps` interface in the `card.tsx` component to a union type that accepts either `WeatherData` and `ForecastData` so that we are able to use this same `Card` component for both pages. In the component, we'll need to check for the `instanceof` the data to see which class has been passed into the component, so that we know which fields we're supposed to display for the page (in this case, `WeatherData` and `ForecastData` will need to be `classes` in order for `instanceof` to work).

#### Display weekday instead of date string

One more change done for this page is that we display the weekday of the corresponding date string instead of the date string itself, since displaying the weekday is more common in weather apps then showing the date itself.

![Screenshot 2024-07-05 at 1 37 44 PM](https://github.com/bensoon-mavericks/simple-weather-app/assets/171893210/efa2d350-90da-4d50-b82b-88e33ffa2c5f)

### Other enhancements

When we use SWR to handle our client requests, it has a cache to store the data returned from the requests, and the library comes with options to configure how we may choose to store our data and when we want to revalidate the data in the cache. For this use case, I've set the refresh interval to 10 minutes and disabled the default setting of revalidating on every refocus on the screen. Reason behind this is because weather data shouldn't change very quickly in Singapore and this would prevent unnecessary requests from being made too often from users, and improves the user experience by reducing the number of requests sent from each user's browser.


## Workflows

For the github workflows, I've made the following changes:
1) triggered whenever master branch is updated.
2) declared two jobs "test" and "deploy", of which "deploy" will only run if "test" is successful.
3) "test" job will run tests and build the project.
4) "deploy" job will build and push an image to ECR, and then deploy that image onto ECS.

![Screenshot 2024-07-05 at 1 50 21 PM](https://github.com/bensoon-mavericks/simple-weather-app/assets/171893210/6b2d7031-eb30-484a-b6bd-1aba29f04966)


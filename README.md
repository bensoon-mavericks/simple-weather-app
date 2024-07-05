# Simple Weather App

A simple weather app using NextJS.

## Setup

- `npm install`
- `npm run dev`

Visit the localhost domain displayed in the console e.g. `http://localhost:3000` and you should see this:

<img width="1512" alt="Screenshot of index" src="https://github.com/yapyuyou/simple-weather-app/assets/31716292/1fb2cbe0-9c63-4d95-91a2-e09efcc60230">

---

## Tasks

1. Something is wrong with the "Now" page and there have been user reports that the weather information does not appear. Investigate and rectify the problem.

### Wrong response code

Currently, the "Now" page (`now.tsx`) makes a call to the `/api/now` endpoint, which then subsequently calls the <https://birdsofaweather.netlify.app/api/weather/now> url. This `/api/now` endpoint returns a `200` status code regardless of whether or not the API call was successful. However, the <https://birdsofaweather.netlify.app/api/weather/now> URL call seems to fail for every 3-4 successful calls.

![Screenshot 2024-07-05 at 12 15 13 PM](https://github.com/bensoon-mavericks/simple-weather-app/assets/171893210/a4c0d6d3-cc96-40b8-9403-0e3ce0726047)

Subsequently, if a call to the URL fails at the `/api/now` endpoint, the response is returned to the frontend as successful however there is no weather data in the response, which then causes the cards to disappear. So in our `/api/now`, we should be returning a more appropriate status code to indicate that there has been an error in making the call to the backend.

### Retry on error

Another problem with the current implementation in `now.tsx` is that if the call to the url above fails, it doesn't do a retry of the fetch to get the weather data due to `now.tsx`'s usage of `useEffect` to fetch the data when the component is mounted onto the page, which leaves the "Now" page in an empty state with no weather data, which will be confusing for the user.

To rectify this problem, we should have a way to retry the fetch on error and also signal to the user that the page is still attempting to retrieve the data from the backend.

One way we can enable our `now.tsx` page to retry on error is by using a library such as SWR to add hooks for our API calls. With SWR, we can now detect whether or not an error has occurred in our backend and attempt to retry fetching from the URL. 

With SWR, it is able to detect whether or not our component is currently in the midst of fetching the data from the backend as well and whether it's in the midst of loading the data into our component. 

Given that we can check the request has failed and if the component is still loading, and also that eventually the call to the URL might succeed, we could consider showing a skeleton of our Card component with a shimmer effect to indicate to the user that we're attempting to load the data from the backend into our page.

https://github.com/bensoon-mavericks/simple-weather-app/assets/171893210/9c3e75e7-5bd5-479a-8f42-4bde7f9436a1





3. Implement the "Forecast" page to display the next 4 days of weather information similar to the "Now" page. You can also improve it as you see fit.

 Note: The forecast data can be found at <https://birdsofaweather.netlify.app/api/weather/forecast>

## Additional Info

Implement your tasks as you would in a real project and make traceable commits with meaningful and consistent commit messages.

You are encouraged to modify, add, and/or remove components as needed. Also feel free to make any changes you would in a large-scale production project e.g. adding tests, linters, and so on.

There is a challenge for devops specific tasks (optional) under the .github/workflows

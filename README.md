<a name="readme-top"></a>


<!-- TITLE -->
<div align="center">
  <h3 align="center">Grace Shopper Buzzed</h3>
  <br>
  <p align="center">
This is a full-stack e-commerce web application built as a group project for a fictional store called "Grace Shopper Buzzed." The app allows users to browse and purchase products, as well as create an account and save their shipping and billing information. Admin users can also add, edit, and delete products.
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<br>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>
<br>


### Built With

* React.js
* Node.js
* Express
* PostgreSQL
* Stripe API

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>


<!-- GETTING STARTED -->
## Getting Started

1. Clone the repository and navigate to the root directory.
   ```sh
   git clone https://github.com/rob166/grace_shopper.git
   ```
2. Install NPM packages.
  ``` sh
  npm install
  ```
3. Create a PostgreSQL database named grace-shopper and seed it.
  ``` sh
  npm run seed:dev
  ```
4. Create a .env file.
  ```js
  PORT = 3001
  DATABASE_URL = 'https://localhost:5432/grace-shopper'
  JWT_SECRET = 'rancho cuca munga'
  STRIPE_SECRET_TEST = 'sk_test_51MjXWeHzJyNcKPcUh1IxkKeEbTbSGyzcovV5zAxZ5ceKoB9lThvsNFKZZSX3TEe8DAonap4FAZHPPnRaOn4YWkd300J7dbB8sM'
  ```
5. Open a new terminal, go to the backend directory, and start the backend server.
  ``` sh
  npm start
  ```
6. Go to the client directory and install NPM packages.
  ``` sh
  npm install
  ```
6. Open another terminal and start the client server.
  ``` sh
  npm start
  ```
7. Navigate to [http://localhost:3000](http://localhost:3000) in your browser to use the app.


<!-- FEATURES -->
## Features

* Users can create an account and log in
* Users can browse products by category and sort products alphabetically
* Users can add products to their cart and checkout using Stripe API
* Users can view previous orders and order again
* Users can save and edit their shipping and billing information for future purchases
* Admin users can add, edit, and delete products

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

* [![LinkedIn][linkedin-shield]][linkedin-url1] Caroline Kim
* [![LinkedIn][linkedin-shield]][linkedin-url2] Daniel Reese
* [![LinkedIn][linkedin-shield]][linkedin-url3] Jessica Alvarado
* [![LinkedIn][linkedin-shield]][linkedin-url4] Robert Rosenzweig

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* This project was inspired by the Grace Shopper project from the Fullstack Academy curriculum.
* Special thanks to our instructors and teaching assistants for their guidance and support.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url1]: https://www.linkedin.com/in/caroline-kim98/
[linkedin-url2]: https://www.linkedin.com/in/daniel-reese-webdev/
[linkedin-url3]: https://www.linkedin.com/in/jess-anahi-alvarado/
[linkedin-url4]: https://www.linkedin.com/in/robrosenzweig/


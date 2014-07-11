# Make the choice depending on your needs

The First thing you need is to include all the necessary stuff in your project. There are 3 ways to use Frontend Core:

* ### CSS components
This is the most easy way to use Frontend Core, with no dependences, but this not allows you to customize anything.

* ###Javascript architecture and components
Allows you to use the data components and use the modules system to create your own components or add behaviours to your site.

* ###SCSS architecture and components
If you are not going to use Javascript or the Data components but you need to personalize the appearence of your site this is the best way. Requires SASS & Compass installed on your computer.

* ###Include the full package (Javascript and SCSS)
The best way to work with Frontend Core. This Allows you to use the data components, the Javascript architecture and a total customization of the appearance of your site. Requires SASS & Compass installed on your computer.

-----

## Install CSS components

This is the most easy way to use Frontend Core, with no dependences, but this not allows you to customize anything.

* 1. Download the CSS package to your statics folder
* 2. Include the general CSS

         <link rel="stylesheet" type="text/css"  href="static/css/index.css" media="all">

* 3. Add the CSS and JS files to support IE9 & IE 8

        <!--[if gte IE 9]>
        <link rel="stylesheet" type="text/css"  href="static/css/ie-new.css" media="all">
        <![endif]-->
        <!--[if lte IE 8]>
        <script src="static/js/ie-old.js"></script>
        <link rel="stylesheet" type="text/css"  href="static/css/ie-old.css" media="all">
        <![endif]-->

* 4. Take a look to the documentation of CSS and start developing your site!

-----

## Install Javascript architecture and components

This installation allows you to use the data components and use the modules system to create your own components or add behaviours to your site.

* 1. Download & Copy FrontendCore JS to your statics folder
* 2. Include the core.js to the head of your page:

        <script src="js/core.js"></script>

* 3. Define the paths for FrontendCore JS and customize it using the var oGlobalSettings:

          <script type="text/javascript">
              var oGlobalSettings = {
                  sPathJs : 'http://' + document.domain + '/frontendcore/build/js/',
                  sPathCss: './css/',
                  bCss : false
              }
          </script>

* 4. Add the JS files to support IE 8

            <!--[if lte IE 8]>
            <script src="{{= it.document.relativePath || '' }}/static/js/ie-old.js"></script>
            <![endif]-->
* 5. Take a look to the documentation of Javascript and start developing your site!

----

## Install SCSS architecture and components

f you are not going to use Javascript or the Data components but you need to personalize the appearence of your site this is the best way. Requires SASS & Compass installed on your computer.

* 1. Download & Copy FrontendCore SCSS to your project
* 2. Open the config.rb and setup the path of your folders

        css_dir = "build/static"

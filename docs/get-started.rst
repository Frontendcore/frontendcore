.. _get-started:

Get Started
============

Installation
-------------

0. Install ruby, sass, compass and susy
	
.. code-block:: bash

	gem install compass --pre

.. code-block:: bash

	gem install susy
		
1. Install [NodeJS](http://nodejs.org/) on your computer
2. Run the terminal/Cmd and Install [Yeoman](http://yeoman.io/)

.. code-block:: bash
	
	npm install -g yo

3. In the terminal, go to the folder you want to install Frontendcore and install the [generator-frontendcore](https://www.npmjs.org/package/generator-frontendcore) (an assistant to install frontendcore in your computer)

.. code-block:: bash

	npm install generator-frontendcore

4. Launch the assistant and follow the steps

.. code-block:: bash

	yo frontendcore

Now you will have the following folders on your computer:

.. code-block:: bash

	static
	  components
	  css
	  fonts
	  js


.. note::

  Also you will have a folder called node_modules at the same level than static. Remember to ignore this on Git or SVN when you commit your code (this is only necessary on development enviroments).

5. Add the CSS components to the head

Include the general CSS

.. code-block:: html

	<link rel="stylesheet" type="text/css"  href="static/css/index.css" media="all">

Add the CSS and JS files to support IE9 & IE 8

.. code-block:: html

	<!--[if gte IE 9]>
		<link rel="stylesheet" type="text/css"  href="static/css/ie-new.css" media="all">
	<![endif]-->
	<!--[if lte IE 8]>
		<script src="static/js/ie-old.js"></script>
		<link rel="stylesheet" type="text/css"  href="static/css/ie-old.css" media="all">
	<![endif]-->

6. Add the Javascript to the head and define the paths

Include the core.js to the head of your page:

.. code-block:: html

	<script src="js/core.js"></script>

Define the paths for FrontendCore JS and customize it using the var oGlobalSettings:

.. code-block:: html

	<script type="text/javascript">
		var oGlobalSettings = {
			sPathJs : 'http://' + document.domain + '/frontendcore/build/js/',
			sPathCss: './css/',
			bCss : false
		}
         </script>

Add the JS files to support IE 8

.. code-block:: html

	<!--[if lte IE 8]>
		<script src="{{= it.document.relativePath || '' }}/static/js/ie-old.js"></script>
	<![endif]-->

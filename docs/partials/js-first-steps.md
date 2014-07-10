##Step 1
Download & Copy FrontendCore JS to your statics folder

-------------------------------------------
##Step 2
Include the core.js to the head of your page:

	    <script src="js/core.js"></script>

-------------------------------------------
##Step 3
Define the paths for FrontendCore JS and customize it using the var oGlobalSettings:

    <script type="text/javascript">
        var oGlobalSettings = {
            sPathJs : 'http://' + document.domain + '/frontendcore/build/js/',
            sPathCss: './css/',
            bCss : false
        }
    </script>

The customizable options for oGlobalSettings are:

<table class="table">
	<thead>
		<tr>
        		<th class="ta-l">Name</th>
        		<th class="ta-l">Description</th>
        		<th class="ta-l">Default</th>
        	</tr>
	</thead>
	<tr>
		<td class="w-15 ta-l">**sPathJs**</td>
		<td class="ta-l">Define the general path for js files.</td>
		<td class="ta-l">'./js'</td>
	</tr>
	<tr>
		<td class="w-15 ta-l">**sPathJsModules**</td>
		<td class="ta-l">Define the path for user modules.</td>
		<td class="ta-l">oGlobalSettings.sPathJs + 'modules'</td>
	</tr>
	<tr>
		<td class="w-15 ta-l">**sPathJsLibs**</td>
		<td class="ta-l">Define the general path for user Libs.</td>
		<td class="ta-l">oGlobalSettings.sPathJs</td>
	</tr>
	<tr>
		<td class="w-15 ta-l">**sPathRoot**</td>
		<td class="ta-l">Define the URL for libs that need to be on the same domain (for example wysiwyg)</td>
		<td class="ta-l">oGlobalSettings.sPathJs + '../../'</td>
	</tr>
	<tr>
		<td class="w-15 ta-l">**sPathJsCore**</td>
		<td class="ta-l">Define the general path for Frontend Core Js.</td>
		<td class="ta-l">oGlobalSettings.sPathJs</td>
	</tr>
	<tr>
		<td class="w-15 ta-l">**sPathCss**</td>
		<td class="ta-l">Define the general path for css files.</td>
		<td class="ta-l">'./css/'</td>
	</tr>
	<tr>
		<td class="w-15 ta-l">**bCss**</td>
		<td class="ta-l">True active async loading for the CSS needed at the UI components. If you set this to false assure to include the css to the libs on your css package.</td>
		<td class="ta-l">true</td>
	</tr>
	<tr>
		<td class="w-15 ta-l">**bTrackModules**</td>
		<td class="ta-l">if true send events to google analitycs when modules are called and executed</td>
		<td class="ta-l">false</td>
	</tr>
	<tr>
    		<td class="w-15 ta-l">**bCart**</td>
    		<td class="ta-l">if true activates de module cart</td>
    		<td class="ta-l">false</td>
    	</tr>
</table>
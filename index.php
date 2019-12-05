<html>
    <head>
        <link href="main.css" rel="stylesheet">
        <script src="./js/validate.js"></script>
        <script src="./js/model.js"></script>
        <script src="./js/service.js"></script>
        <script src="./js/presenter.js"></script>
        <script src="./js/form.js"></script>
        <script src="./js/view.js"></script>
        <script src="./js/controller.js"></script>
    </head>
    <body>
        <div id='app'></div>
        <script>
            new Controller(document.getElementById('app'));
        </script>
        <button onclick="StorageFactory.clearStorage()">Clear Storage</button> 
    </body>
</html>
<?php
require("AJprojectcreds.php");
echo $_POST["method"]();
function sanitize($str, $quotes = ENT_NOQUOTES) {
    $str = htmlspecialchars($str, $quotes);
    return $str;
}
function getSeries() {
    $dbConn = mysqli_connect(server(), username(), password(), db());
    $query = "select * from Series";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }
    $Series = array();
    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 3; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($Series, $allColumns);
        }
    }
    $return = new stdClass();
    $return->success = true;
    $return->Series = $Series;
    $return->querystring = $query;
    return json_encode($return);
}
function getPublishers() {
    $dbConn = mysqli_connect(server(), username(), password(), db());
    $query = "SELECT * FROM Publishers";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }
    $Publisher = array();
    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 2; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($Publisher, $allColumns);
        }
    }
    $return = new stdClass();
    $return->success = true;
    $return->Publisher = $Publisher;
    $return->querystring = $query;
    return json_encode($return);
}
function insertSeries() {
   
    if (isset($_POST['Publisher'])) {
        $Publisher = json_decode(sanitize($_POST['Publisher']));
    }
    if (isset($_POST['SeriesName'])) {
        $SeriesName = json_decode(sanitize($_POST['SeriesName']));
    }
    if (isset($_POST['ReleaseDate'])) {
        $ReleaseDate = json_decode(sanitize($_POST['ReleaseDate']));
    }
    $dbConn = mysqli_connect(server(), username(), password(), db());
    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }
    $query = "INSERT INTO Series ( Publisher, SeriesName, ReleaseDate ) " .
            "VALUES ( " .
            "'" . $Publisher . "'," .
            "'" . $SeriesName . "'," .
            "'" . $ReleaseDate . "');";
    $result = $dbConn->query($query);
    $return = new stdClass;
    $return->querystring = (string) $query;
    if ($result) {
        $return->success = true;
    } else {
        $return->success = false;
    }
    return json_encode($return);
}
import { XMLHttpRequest } from "xmlhttprequest";

const URL = "http://ec2-3-228-9-72.compute-1.amazonaws.com";

function httpGet(url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function httpPost(url, jsondata) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", url);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(jsondata));
  return xmlhttp.responseText;
}

export function createGroup(group) {
  return httpPost(URL + "/api/groups/", group);
}

export function findGroup(groupId) {
  return httpGet(URL + "/api/groups/" + groupId);
}

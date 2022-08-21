import { XMLHttpRequest } from "xmlhttprequest";
import dotenv from "dotenv";

dotenv.config();

const URL = loadURL();

const GET_METHOD = "GET";
const POST_METHOD = "POST";

const USERS_PATH = URL + "/api/users/";
const GROUPS_PATH = URL + "/api/groups/";
const ATTENDANCES_PATH = URL + "/api/attendances/";

function loadURL() {
  let environment = process.env.ENVIRONMENT;
  let port = process.env.PORT;
  if (environment == "dev") {
    return `http://localhost:${port}`;
  } else {
    return "http://ec2-3-228-9-72.compute-1.amazonaws.com";
  }
}

function request(method, url, body) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onload = (e) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.onerror = (e) => {
      reject(xhr.statusText);
    };
    switch(method) {
      case POST_METHOD:
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(body));
        break;
      case GET_METHOD:
        xhr.send();
        break;
      default:
        reject("INVALID_METHOD_TYPE");
    }
  });
}

async function requestsHelper(method, url, body) {
  try {
    let response = await request(method, url, body);
    return response;
  } catch(err) {
    console.log(`Error: ${err}`);
  }
}

// groups
export function createGroup(body) {
  return requestsHelper(POST_METHOD, GROUPS_PATH, body);
}

export function findGroup(groupId) {
  return requestsHelper(GET_METHOD, GROUPS_PATH + groupId, {});
}

export function findAllGroups() {
  return requestsHelper(GET_METHOD, GROUPS_PATH, {});
}

// attendances
export function createAttendance(attendance) {
  return requestsHelper(POST_METHOD, ATTENDANCES_PATH, attendance); 
}

export function getAttendanceStat(groupId, startDate, endDate) {
  return requestsHelper(GET_METHOD, ATTENDANCES_PATH + "stat/points?groupID=" + groupId + 
  "&startDate=" + startDate + "&endDate=" + endDate, {});
}

// users
export async function findUser(userId) {
  return requestsHelper(GET_METHOD, USERS_PATH + userId, {});  
}

export function createUser(user) {
  return requestsHelper(POST_METHOD, USERS_PATH, user);
}

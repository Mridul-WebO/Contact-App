// create methods to perform operations like save/edit/delete/add data

/*

 userData =[
    {
        userId: unique id,
        name:'',
        phoneNumber:'',
        password:'',
        image: link/url
    },
    
 ] 

*/

const storageId = "userData";
/**
 * Set updated data in localStorage.
 * @param {Array<Object>} dataArr - The updated data array. This array should be decorated.
 * @throws {Error} Throws an error if there is an issue setting the updated data.
 */
export function setter(dataArr) {
  try {
    localStorage.setItem(`${storageId}`, JSON.stringify(dataArr));
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Retrieve employee data from local storage.
 * @returns {Array<Object>} Returns an array of employee data. Each object in the array should be decorated.
 * @throws {Error} Throws an error if there is an issue retrieving the data.
 */
export function getData() {
  try {
    const employeeData = JSON.parse(localStorage.getItem(`${storageId}`)) ?? [];
    return employeeData;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Get a single data object based on the provided editRowId.
 * @param {number} userId - The identifier for the row to be retrieved. This parameter should be decorated.
 * @throws {Error} Throws an error if there is an issue retrieving the data.
 * @returns {Object} Returns an object with status and the retrieved rowToUpdate.
 */
export function getSingleData(userId) {
  try {
    const storedData = getData();
    const data = storedData.find((val) => val.userId === userId);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Edit data in the storage array.
 * @param {Object} dataObj - The data object to be edited. This object should be decorated.
 * @throws {Error} Throws an error if there is an issue editing the data.
 */
export function editData(dataObj) {
  try {
    const storedData = getData();
    const rowIndex = storedData.findIndex(
      (val) => val.userId === dataObj.userId
    );

    storedData.splice(rowIndex, 1, dataObj);
    setter(storedData);

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Delete data based on the provided deleteRowId.
 * @param {number} userId - The identifier for the row to be deleted. This parameter should be decorated as userId.
 * @throws {Error} Throws an error if there is an issue deleting the data.
 * @returns {boolean} Returns true if the data is successfully deleted.
 */
export function deleteData(userId) {
  try {
    const employeeData = getData();
    const updatedData = employeeData.filter((val) => val.userId !== userId);

    setter(updatedData);

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Add data to the storage array.
 * @param {Object} dataObj - The data object to be added. This object should be decorated.
 * @throws {Error} Throws an error if there is an issue adding the data.
 * @returns {boolean} Returns true if the data is successfully added.
 */
export function addData(dataObj) {
  try {
    const employeeData = getData();
    employeeData.unshift(dataObj);

    setter(employeeData);

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

export function removeCurrentUser() {
  try {
    sessionStorage.removeItem("currentUser");
  } catch (error) {
    throw new Error(error);
  }
}

export function fetchCurrentUser() {
  try {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    return currentUser;
  } catch (error) {
    throw new Error(error);
  }
}

export function addContactDetails(dataObj, userId) {
  try {
    const data = getData();

    const currentUser = data.find((user) => user.userId === userId);
    const currentUserIndex = data.findIndex((user) => user.userId === userId);

    currentUser?.contacts.unshift(dataObj);
    data.splice(currentUserIndex, 1, currentUser);

    setter(data);
  } catch (error) {
    throw new Error(error);
  }
}

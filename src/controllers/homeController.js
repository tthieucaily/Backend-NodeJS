import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("post crud from server");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("display-crud.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  console.log(userId);
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    return res.render("edit-crud.ejs", {
      dataEdit: userData,
    });
  } else {
    return res.send("Users not find!");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  console.log(data);
  if (data.id === undefined || data.id === null) {
    return res.status(400).send("ID is missing or invalid");
  }
  let allUsers = await CRUDService.updateUser(data);
  return res.render("display-crud.ejs", {
    dataTable: allUsers,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  console.log(id);
  if (id) {
    await CRUDService.deleteUserByID(id);
    return res.send("Delete user cuccess!");
  } else {
    return res.send("User not find!");
  }
  // return res.send()
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};

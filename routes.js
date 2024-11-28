// import express
const express = require('express')

// import registerController
const registerController=require('./controllers/registerController')
// import uploadController
const uploadController=require('./controllers/uploadController')
// import courseController
const courseController=require('./controllers/courseController')
// import subscriptionController
const subscriptionController=require('./controllers/subscriptionController')
// import ChatController
const ChatController=require('./controllers/chatController')
// import jwtmiddleware
const jwt=require('./middleware/jwtMiddleware')

const multer=require('./middleware/multerMiddleware')

const videoMulter=require('./middleware/videoMulterMiddleware')

// create object for Router Class

const router=new express.Router()

// mentor register
router.post('/mregister',multer.single("verifyimg"),registerController.mentorRegisterController)
// user register
router.post('/uregister',registerController.userRegisterController)

// login
router.post('/login',registerController.loginController)

// mentor profile verify
router.put('/verify-mentor',registerController.verifyprofileController)

// update user profile
router.put('/update-user',jwt,multer.single('profile'),registerController.updateProfileController)

// update Mentor Profile
router.put('/update-mentor',jwt,multer.single('profile'),registerController.updateMprofileController)

// Update Admin Profile
router.put('/update-admin',jwt,multer.single('profile'),registerController.updateAprofileController)
// get unverifyed mentors
router.get('/get-mentors',registerController.getMentorProfileController)

// upload videos
router.post('/uploads',jwt,videoMulter,uploadController.uploadVideosController)

// get uploads in mentor profile
router.get('/get-uploads',jwt,uploadController.getUploadsController)

// delete uploded video by mentor
router.delete('/delete-video/:id',uploadController.deleteUploadsController)
// get all verifyed mentors
router.get('/get-vmentors',registerController.getVerifiedMentorController)

// get mentor by id
router.get('/get-umentor/:id',registerController.getMentorbyIdController)

// get metor uploaded videos on user profile
router.get('/get-muploads/:id',uploadController.getMentorUploadsController)

// purchase course by user
router.post('/course-purchase',jwt,courseController.addCourseController)

// get user added mentor details
router.get('/user-courses/:id',courseController.getAddedCourseController)

// detete courses added by user
router.delete('/delete-course/:id',courseController.deleteCourseController)

// get user count on admin pannel
router.get('/user-count',registerController.getUserCountController)

// add subscription
router.post('/subscription',subscriptionController.addSubscriptionsController)

// get all subscriptions
router.get('/get-subscription',subscriptionController.getSubscriptionController)

// get total subscription count
router.get('/sub-count',subscriptionController.getSubCountController)

// get total students count
router.get('/std-count/:id',courseController.stdCountController)

// get total course enroled
router.get('/course-count/:id',courseController.courseCountController)



// chat routes

router.get('/chat/:room',jwt,ChatController.getChatHistoryController)// Get chat history for a room

router.get('/users',jwt,ChatController.getAllUsersController)// Get all users

router.get('/interacted-users',jwt,ChatController.getIntractedUsersController) //get intracted users




module.exports=router
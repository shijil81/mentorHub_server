const mongoose=require ('mongoose')

const mentorAvailabilitySchema = new mongoose.Schema({
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', // Reference to the users model for mentors
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    slots: [
      {
        fromTime: {
          type: String,
          required: true,
        },
        toTime: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['available', 'booked'],
          default: 'available',
        }
      }
    ]
  }, { timestamps: true });

  const mentorAvailabilities = mongoose.model("mentorAvailabilities", mentorAvailabilitySchema);

module.exports = mentorAvailabilities;
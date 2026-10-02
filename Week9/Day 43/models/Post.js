const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 5
        },

        body: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft"
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Index on author
postSchema.index({ author: 1 });

module.exports = mongoose.model("Post", postSchema);
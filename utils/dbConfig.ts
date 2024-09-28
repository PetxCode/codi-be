import { connect } from "mongoose";

export const url: string =
  "mongodb+srv://skillscapeofficier:skillscapeofficier@cluster0.0dubq.mongodb.net/skillScapeDb?retryWrites=true&w=majority&appName=Cluster0";


export const dbConfig = async () => {
  try {
    await connect(url).then(() => {
      console.clear();
      console.log("Connected... ❤️❤️🚀🚀🎮🎮");
    });
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1);
  }
};

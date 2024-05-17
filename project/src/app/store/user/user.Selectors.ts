import { createFeatureSelector } from "@ngrx/store";
import { usermodel } from "../Model/usermodel";

const getuserstate=createFeatureSelector<usermodel>('user')
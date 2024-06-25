import { action, makeAutoObservable, observable } from "mobx";
import { CodeDeliveryDetails } from "../Models/types";
import User from "../Models/User";

class AuthStore {
  user: User = new User();
  isAuthenticated: boolean = false;
  codeDeliveryDetails: CodeDeliveryDetails | undefined;
  STORAGE_KEY = "amplifyBlog";

  constructor() {
    if (
      localStorage.getItem(this.STORAGE_KEY) &&
      localStorage.getItem(this.STORAGE_KEY) !== "" &&
      localStorage.getItem(this.STORAGE_KEY) !== "{}"
    ) {
      let localData = JSON.parse(
        localStorage.getItem(this.STORAGE_KEY) ?? "{}"
      );
      this.user = localData.user;
      this.isAuthenticated = true;
    } else {
      // init user
      this.user = new User();
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify({ user: new User() })
      );
    }
    makeAutoObservable(this, {
      user: observable,
      isAuthenticated: observable,
      codeDeliveryDetails: observable,
      setUser: action,
      setUserId: action,
      setCodeDeliveryDetails: action,
    });
  }

  setUser(user: User) {
    this.user = user;
    let localData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? "{}");
    localData.user = user;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(localData));
  }

  setUserId(id: string) {
    this.user.id = id;
    let localData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? "{}");
    localData.user.id = id;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(localData));
  }

  setCodeDeliveryDetails(details: CodeDeliveryDetails) {
    this.codeDeliveryDetails = details;
  }

  setIsAuthenticated(val: boolean) {
    this.isAuthenticated = val;
  }
}

export default new AuthStore();

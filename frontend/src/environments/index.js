import devlocalConfig from "./config.devlocal.json";
import devdockerConfig from "./config.devdocker.json";

const getEnvironment = () => {
  switch (process.env.REACT_APP_API_ENV) {
    case "devlocal": {
      return devlocalConfig;
    }
    case "prod": {
      return devdockerConfig;
    }
    default: {
      throw new Error("NODE_ENV not being set");
    }
  }
};

export default getEnvironment;

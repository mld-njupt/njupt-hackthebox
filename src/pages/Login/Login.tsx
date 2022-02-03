import { useEffect } from "react";
import ParticleWave from "../../utils/canvasInit";
const Login = function () {
  useEffect(() => {
    let pw = new ParticleWave();
    pw.run();
  }, []);
  return (
    <div className="loginContainer">
      <canvas></canvas>
    </div>
  );
};
export default Login;

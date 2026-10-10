document.getElementById("run-checks").addEventListener("click", async () => {
  const result = document.getElementById("result");
  const original = {
    print: settings.printAmount,
    age: settings.ageAmount,
    seed: settings.pattern,
    treatment: settings.treatment
  };
  const snapshot = () => document.querySelector("canvas").toDataURL();
  const render = (print, age, seed) => {
    settings.printAmount = print;
    settings.ageAmount = age;
    settings.pattern = seed;
    draw();
    return snapshot();
  };
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  let instance;
  try {
    const clean = render(0, 0, 17);
    const aged = render(0, 0.65, 17);
    check(clean !== aged, "Age should change pixels");
    const both = render(0.45, 0.65, 17);
    render(0.2, 0.1, 98);
    check(render(0.45, 0.65, 17) === both, "Settings should restore identical pixels");
    check(render(0.45, 0.65, 18) !== both, "Seed should change pixels");
    check(render(0, 0, 999) === clean, "Zero settings should preserve clean pixels");
    const printed = render(0.45, 0, 17);
    check(printed !== clean, "Print should change pixels");
    check(render(0.45, 0, 17) === printed, "Age zero should preserve print pixels");
    settings.treatment = "element-age";
    check(
      render(0, 0, 17) === clean,
      "Per-group age zero should preserve clean pixels"
    );
    const groupedAge = render(0, 0.65, 17);
    check(groupedAge !== aged, "Group and sheet ageing should differ");
    render(0, 0.2, 35);
    check(render(0, 0.65, 17) === groupedAge, "Per-group ageing should repeat exactly");
    settings.treatment = original.treatment;
    const reference = render(0.45, 0.65, 17);
    const instanceImage = await new Promise((resolve) => {
      const host = document.createElement("div");
      host.id = "instance-drawing";
      document.querySelector("main").append(host);
      instance = new p5((p) => {
        p.setup = () => {
          p.createCanvas(600, 840).parent(host);
          p.pixelDensity(1);
          p.noLoop();
        };
        p.draw = () => {
          MerzSurfacePage.render(p, {
            printAmount: 0.45,
            ageAmount: 0.65,
            pattern: 17,
            treatment: "both"
          });
          resolve(p.canvas.toDataURL());
        };
      });
    });
    check(instanceImage === reference, "Global and instance pixels should match");
    result.textContent =
      "PASS: rendered zero identity, repeatability after other settings, seed distinction, separate print/age contribution, per-group ageing and global/instance parity.";
  } catch (error) {
    result.textContent = "FAIL: " + error.message;
  } finally {
    if (instance) instance.remove();
    document.getElementById("instance-drawing")?.remove();
    settings.printAmount = original.print;
    settings.ageAmount = original.age;
    settings.pattern = original.seed;
    settings.treatment = original.treatment;
    draw();
  }
});

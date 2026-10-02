// Q2: Bugs: (1) class should be className, (2) multiple root elements need a wrapper
function Q02_FixedJSX() {
  return (
    <>
      <div className="box"><p>Hi</p></div>
      <div>Bye</div>
    </>
  );
}

export default Q02_FixedJSX;

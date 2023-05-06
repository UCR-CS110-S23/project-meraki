function NewPost() {
  return (
    <div>
      <div id="newPost">
        <div id="inputs">
          <input className="input" id="nameInput" type="text"></input>
          {/*still need to add 'value' and 'onChange'*/}
        </div>
      </div>
    </div>
  );
}
export default NewPost; //export NewPost so that other scripts like App.js can use it

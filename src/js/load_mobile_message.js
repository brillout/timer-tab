export default load_mobile_message;

function load_mobile_message() {
  addStyle();
  addHtml();
}

function addHtml() {
  const htmlContent = (
`
<div>
  <p>
    Timer Tab is not mobile compatible.
  </p>

  <p>
    Same goes for small-sized tablets. (Timer Tab does work on normal-sized tables.)
  </p>

  <p>
    (Technically speaking: Timer Tab needs at least 900px width.)
  </p>

  <p>
    Click <a id='mobile_contact_1'>here</a> if you are interested in a mobile version of Timer Tab.
  </p>

  Romuald<br/>
  <a id='mobile_contact_2'></a>
</div>
`
  );

  const overlay = createOverlay('mobile_message');
  overlay.innerHTML = htmlContent;

  let email = 'timertab';
  email+='@';
  email+='brillout';
  email+='.';
  email+='com';

  const mobile_contact_1 = document.getElementById('mobile_contact_1');
  const mobile_contact_2 = document.getElementById('mobile_contact_2');

  mobile_contact_2.innerHTML = email;
  mobile_contact_2.setAttribute(
    'href',
    'mailto:'+email
  );
  mobile_contact_1.setAttribute(
    'href',
    'mailto:'+email+
    '?subject='+encodeURIComponent("Timer Tab Mobile")+
    '&body='+encodeURIComponent("Hi Romuald, I'm interested in a mobile version of Timer Tab :-).")
  );
}

function createOverlay(id) {
  const overlay = document.createElement('div');
  overlay.id = id;
  overlay.style.position = 'fixed';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.zIndex = '999999';
  overlay.style.overflow = 'hidden';
  document.body.appendChild(overlay);
  return overlay;
}

function addStyle() {
  const css_content = (
`
#mobile_message {
  display: flex;
  align-items: center;
  justify-content: center;

  background: #eee;
  color: #333;
}
#mobile_message a {
  text-decoration: underline!important;
}
@media (min-width: 900px) {
  #mobile_message {
    display: none !important;
  }
}
`
  );

  addCss(css_content);
}


function addCss(content) {
  const el=document.createElement("style");
  el.appendChild(document.createTextNode(content));
  el.setAttribute("type", "text/css");
  document.getElementsByTagName("head")[0].appendChild(el);
}


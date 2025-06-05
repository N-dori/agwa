export const AppHeader = () => {
const logoSrc = 'https://static.wixstatic.com/media/5c6b1b_208bcc3c6583407d8658a333e3085538~mv2.png/v1/fill/w_105,h_30,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Agwa%20logo.png'
  return (
    <section className="header-container flex-jc-ac">
        <div className="logo-container img-wrapper">
            <img src={logoSrc} alt="image of logo"/>
        </div>
    </section>
  )
}
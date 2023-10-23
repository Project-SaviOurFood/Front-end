import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import '../components/FooterStyle.css'; 


function Footer() {

  const { userResponse: {token} } = useContext(UserContext)

  let footerComponent

  const data = new Date().getFullYear()

  if(token !== '') {
    footerComponent = (
      <>
        <section>
          <div>
            <p className='bg-gelo flex justify-center mt-16 pt-0.5'>Savi Our Food  Generation | Copyright: {data}</p>
            <p className='bg-gelo flex justify-center mt-0 pb-0.5'>Acesse nossa organização no GitHub:  <a href="https://github.com/Project-SaviOurFood" target='_blank'>
              <img src="src/assets/github.png" alt="GitHub logo" width={25} height={25}/>
              </a> </p>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {footerComponent}
    </>
  )
}

export default Footer
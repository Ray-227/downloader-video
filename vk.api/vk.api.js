
const clientID = '51562947'
const redirectURI = 'https://oauth.vk.com/blank.html'
const scope = 'video,groups,manage,stats'

const vkAuthLink = `https://oauth.vk.com/authorize?client_id=${clientID}&display=page&redirect_uri=${redirectURI}&scope=${scope}&response_type=token&revoke=1&v=5.131`

console.log(`LOG: vkAuthLink`, vkAuthLink);
const urlApiVk = 'https://api.vk.com/method/'

const accessVKToken = 'vk1.a.tJ-ViXOkp8Oi8ze3pppJH1u-jutEWEF_1bI1eWb3HM_2mD34PNxsgqApcIEYkjF2szeKS9BnHIuCaRtiVE5mDaoX2Zb7PK7lywXnbO_gLPvTwr50nsDOh1kvlqbNSM3qCd7nEj_Up2MdKoSTFM9MopHvbQSNUmVmC3LudIXrD11afwRJXkh0k-0EYUbNtc1w_4aVZB89b4mcmR1FwuxT5Q'
const serviceSecretKey = '794af12d794af12d794af12d817a5838ee7794a794af12d1abcb55374e6ff43174bf1df'
async function getGroupID () {
    const res = await fetch(`${urlApiVk}utils.resolveScreenName?access_token=${accessVKToken}&screen_name=elitereborn&v=5.131`,
      {
          method: 'GET',
          // headers: {
          //     Authorization: `Bearer ${serviceSecretKey}`
          // }
      })
    console.log(`LOG: res`, res);
}

// getGroupID()

// fetch(
//   `${urlApiVk}video.save?name=test&description='test desc'&group_id=club172490659&access_token=${accessVKToken}&v=5.131`,
//   {
//     method: 'POST',
//     headers: {
//
//     },
//     body: JSON.stringify({
//
//     })
//   }
// )
// .then()
// .catch()
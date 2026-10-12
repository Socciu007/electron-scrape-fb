// Function to scrape the data member of group page from the browser (group page)
const postMemberOfGroupPage = () => {
  return `(async () => {
    const delay = async (time) => {
      await new Promise(resolve => setTimeout(resolve, time));
    }
    try {
      await delay(1000)
      const documentPage = document?.querySelector('div[role="feed"]')
      if (!documentPage) return []

      await delay(2000)
      let elementArr = documentPage?.querySelectorAll('.x1n2onr6.xh8yej3.x1ja2u2z.xod5an3')
      // console.log('Length of elementArr: ', elementArr.length)
      if (!elementArr || !elementArr.length) return []

      let data = []
      for (let i = 0; i < elementArr?.length; i++) {
        await delay(1000)
        // Scroll to the element ith
        elementArr[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        await delay(1000)
        const btnSeeMore = elementArr[i]?.querySelector('span > div > div > div > div[role="button"]') ||
          elementArr[i]?.querySelector('div > div > span > div > div:nth-child(3) > div > div')
        if (btnSeeMore) {
          // btnSeeMore.scrollIntoView({ behavior: 'smooth', block: 'center' });
          btnSeeMore.focus()
          btnSeeMore.click()
          await delay(1000)
        }

        // Scrape text content of the element
        await delay(1000)
        let textContent = elementArr[i]?.querySelectorAll('.html-div.xdj266r.x14z9mp.xat24cr.x1lziwak.x1l90r2v.xv54qhq.xf7dkkf.x1iorvi4')?.[0]?.textContent
        if (!textContent) textContent = elementArr[i]?.querySelectorAll('div.html-div.xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl > div > div > div > div > div > span > div')?.[3]?.textContent
        if (!textContent) textContent = elementArr[i]?.querySelectorAll('div.html-div.xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl > div > div > div > div > div > span > div')?.[2]?.textContent
        if (!textContent) textContent = elementArr[i]?.querySelectorAll('div > div > span > div.html-div.xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl')?.[2]?.textContent
        if (!textContent) textContent = elementArr[i]?.querySelectorAll('span[dir="auto"].x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xo1l8bm.xzsf02u.x1yc453h')?.[0]?.textContent
        if (!textContent) textContent = elementArr[i]?.querySelectorAll('.x78zum5.xdt5ytf.xz62fqu.x16ldp7u')?.[1]?.textContent
        if (!textContent) textContent = elementArr[i]?.querySelector('.x6s0dn4.x78zum5.xdt5ytf.x5yr21d.xl56j7k.x10l6tqk.x17qophe.x13vifvy.xh8yej3')?.textContent
        if (!textContent) textContent = elementArr[i]?.querySelector('div.x9f619.x2lah0s.x1n2onr6.x78zum5.x1iyjqo2.x1t2pt76.x1lspesw > div > div > div > div > div > div:nth-child(5) > div > div > div > div > div > div > div > div > div > div > div.html-div.xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl > div > div > div:nth-child(3) > div > div > div > div')?.textContent
        const textAccount = elementArr[i]?.querySelector('b')?.textContent || elementArr[i]?.querySelector('.html-strong')?.textContent || '0'
        const textIdAccount = elementArr[i]?.querySelector('.html-h3 a')?.href?.split('/')?.[6] || elementArr[i]?.querySelector('.xjp7ctv > a')?.href?.split('/')?.[6] || ''
        const urlAvatar = elementArr[i]?.querySelector('g > image')?.href?.baseVal || ''
        if (!textIdAccount) continue;
        const urlFacebook = 'https://www.facebook.com/' + textIdAccount
        await delay(1000)
        console.log('textIdAccount: ', textIdAccount)
        console.log('urlAvatar: ', urlAvatar)
        console.log('urlFacebook: ', urlFacebook)
        console.log('textContent: ', textContent)
        console.log('textAccount: ', textAccount)

        data.push({
          content: textContent,
          group: 'LOGISTICS VIETNAM',
          account: textAccount,
          idAccount: textIdAccount,
          urlAvatar: urlAvatar,
          urlFacebook: urlFacebook
        })
        console.log('data: ', i, data)
        console.log('elementArr: ', elementArr.length)

        if (elementArr.length < 500) {
          await delay(2000)
          elementArr = documentPage?.querySelectorAll('.x1n2onr6.xh8yej3.x1ja2u2z.xod5an3')
          console.log('Length of page array: ', elementArr.length)
        } else {
          break
        }
      }

      // Remove duplicate comment and add field contactUs
      data = data.filter((item, index, self) =>
        index === self.findIndex((c) => c.content === item.content)
      ).map((c) => {
        const contactUs = Array.from(new Set(c?.content?.match(/\\+?\\d{1,3}(?:[.\\s]?\\d{1,4})+|\\b0\\d{9}\\b/g)
          ?.filter((num, index, self) =>
            self.indexOf(num) === index && num.replace(/\\D/g, '').length >= 9
          )
          ?.map(num => num.match(/\\d+/g)?.join('') || '')
          ?.filter(Boolean) || []))
          ?.join(', ') || '';
        return { ...c, zalo: contactUs, contactUs };
      })
      return data
    } catch (error) {
      console.log('Error scraping data from browser: ', error)
      return []
    }
  })()`
}

module.exports = {
  postMemberOfGroupPage
}
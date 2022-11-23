import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.scss'
import Toolbar from "../components/Toolbar"
import Sidedrawer from "../components/Sidedrawer"
import Backdrop from "../components/Backdrop"
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Catogory from '../components/Catogory'
import { useQuery, gql } from "@apollo/client";
import Link from 'next/link'


const CATEGORY = gql`
query getCategories {
  categories {
    data {
      id 
        attributes{
          categoryname
          categoryimage
      }
    }
  }
}
`

export default function Home() {
  const {loading,error,data} = useQuery(CATEGORY)
const [sidedraweropen,setSidedraweropen] = useState(false);
 const drawerToggleClickHandler = () => {
    setSidedraweropen(!sidedraweropen);
  }

 const  backdropClickHandler = () => {
    setSidedraweropen(false);
  }
data && console.log(data.categories.data)
  return (
    <div className={styles.container}>
      <Toolbar drawerClickHandler = {drawerToggleClickHandler}/>
<Sidedrawer show = {sidedraweropen}/> 
     {sidedraweropen ? <Backdrop click = {backdropClickHandler}/> : null} 
      <main className={styles.main_content}>
        {/* <p>content starts from hereajskdhasjddhdasgdashkdghkkkkdhhhdhdsdbhasdsahhdkasdhkassgdasahhd vhdasgdhsdhjgdbad ahjdbhjgdad</p> */}
        <Carousel autoPlay infiniteLoop>
                <div>
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUQEhMVFhUXFxUVFRUXFRYVFRUVFRUWFhUVFxUYHSggGBolHRUVITEhJSkrLi8uFx8zODMtNygtLisBCgoKDg0OGhAQFy0fHSUtLSstKystLSsvLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEUQAAEEAAIGBwUECAQGAwAAAAEAAgMRBCEFEjFBUWEGEyJxgZGhMlKxwdEUQpLwBxVicqLS4fEzU2OCFiRDg5PTFyPi/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EADkRAAIBAgQCCQIEAwkAAAAAAAABAgMRBBIhMVFxBSJBYZGhsdHwE4EywdLhFELxBhVDUlNygpKi/9oADAMBAAIRAxEAPwDyENQMcNitgKrpAbPH5KmMpJJ6SpSIZaGi22HeCoUtPRAyd3j5prcC3qZKnqrRLcvP4KpSpjBaqbVRdVKkgA6qbVRtVKkAA1Ui1GLUi1AAC1MWoxCYtQAEtQi1WHBQISGAKYhELU1IFYHSZFpNSAsDSRKTUgLEKTIlJUgLA6SpTpKkh2IpKVJ6TEQSpEpNSAIUkQp0mQBGlFTpMQgRBJSpMkBrhVsfsHijgqvjdgVMZUSSSUgMtTQ/su7x81mLR0Vsd3hNAjQJy8/gqoVi1VBVDJBPSa0kgHUaSTgoAakiE6ZACIUSE5SKABOCGQilQKGOwMhRIUiE1JDI0mpSpKkANSalKk1IAjSVKVJkhDUlSdKkANSVKVJqQAk9JUpUmBGlEtU6SpOwWBkKJCNSgQkSDpRpEKggC+CgYvcpoWI3IACknTFIY6u6NOTu8KireAOTvBCBGgXZKsCpEoQKoCdqVoadFxj2pWoJwi4EgUrUAntAElElNaRQAxQyiFQSGRTKVJqQBGk1KVJUgCNJ09JqQA1JUnKVJARpKlIBKkARpKlKkkARCkAlSdMQqTJ6ToAioOU6USECBqFItKFIEGQ5UrTSIDcgkkkpGJWsGcj4KqrGG2FNAWC5DClaGExhErUFJADqSgkgZO0lEFThic8hrAXOJoAAkk8ABmSgEMrGCwUkzxHExz3nY1oLj30N3NdRguiccAEmPk1TtGHYQZD++/YwchZ5hGxfSrUYYcKxsEfusFF3N7trjzJUufAehnv6FTs/x5IYeReHu/Cy1XOhsI328VK7kzDtHq6X5KnPi3ONkkoBcpuylJLsXn7mg/DaP3PxZ7+pHyKAcNg9zsR49X/KgRau111yIB86KELurRrxLjWS/wAOL55v1Fl0GEH35PFt/BMMPhjslI/7cirSYUPz4D1WY5lGk0nxKWKjt9GH/v8AWbwwMG6ZviHj4hHwuhmSODWPjcfdEn1Gxc00G6zH0XX4KMYWEvf7Thru4jPsM9fMlTO6W534CFHFTalSUYxV5SUp6eMpb9/fwA6X0I3DSdXONQkWCHBzXNOxzSDmFWi0PHJmyQ1ssgEA81Qh18TKTIb3k35AfnitHEaLfhmiRjzmcwdhrjQVo8mf4urt4eNgc3RuZvsgPoA00jXAO/Uu9x7t9LJlYWmnAg8CCD6rqcDGyVpkLQ92biHZm23rsF7DRcQdtgcVZwMHWyiG9eN96of2i00SKcc6y9Um2jelGnUeR9V8d14brxfI4pKl1WlejIaTqEjkdi5+TAvB1av880RmpbF1cDWp/wAt1xWpWAT0rZ0ZN/lP9EnaOmH/AEz6fVVdcTN4Sv8A6cv+svYqpiro0c7jG3vkj/mRY9CyO2GM0CaD7NDMpZlxNI9H4p7UpeFvWxlKSchOqOMhSHSIQgoJuK0zintM4pAMmUkyBjI8B2oCNDvQgCqIUkTCYOSQ1Gxzu4Egd52DxTKSbdkDtOtSDQnaLZpBFWVNaJXX4ODf4ltYDoUyYOMeMFNBLi+EsaAN5cHkAKcyNXh6sd4s5FX9HSajS7VYTYovY19VwDwQNu3kiu0I+yAbzoENNO5gGj5ha2iuiMz3Auile27pkbs+52xvfmplNW3O2lgMRTlmnS077L1ZSweipcZISNVrWgdZKQGRxjcXEAC+DRme7Mbv61w+CaY8ELkIp+JeB1juIYPuN5ed7Vpz9GsXMBCwMiY0W2InVDb3kNLnEn3nA96oSfo3xv8ApHukPzaEk7nPVoVXJvKl917nLYrGueSXEkniq+suok6CYlu0x+DwUE9D59je04mg1urzzvW7t2/klmjxEsHXeqgznFAuC6n/AIBxlAmJ17xcWQ5EyZ+iaToLid0Lxxt8RvwDsvVVmRn/AA9X/Kzl+svJSMrQNufD5roP+EMS3bAT/uj/AJlRxGhZmnOEjvez+dGaPEf8LXe1KT/4v2M6DEAf2Kry4F7qc1pNi63+A2kLTboyW82Hzj9O2tSLoZjJG9fFA/VG17tUbKN0HEnYN25PMhPBYmO9KS5xa9bGN0fwGtJrOGTKLhtz+43xIJ7mo3SKbXOprbCC7m48+XzW1gsKYmCMlodeu8vJ9vwBNZAefFYGktGujcSA94vW1g1vG9ou/IKE80rnuV8PVwuAVGEG5Td5tJuy7Fw9O3ibmhOjj2C3uAsg5ZmqyHxWhprDMEVO13bmsY23uPLLNDwDp56vFYWP94y35iMMHiU+kejU7CJJ367fuvYQY/AtNeZS63a/AtLBKGXD0lObWmfKt+3rSV+UUYmgYpI3kCN7bp7GEOLwWnKxVm+7cuw0FoB0M32l5DWAuMcdgv7TTQNE1V788tiyWYgt7LeyOGYXddFMXgmsH/Ms+0u/zDG3q+IjZK4An9o33IzN6GNfouGDSq1Z632Ssr/kly22Rj6ch1B1ko1NbNoPtOHEN21zK5HEwB+xtDiV6ZpLonhpC6WTGTAnMySwukZ4zABnqsh/Q/DOBMWk4H/D8TXOUZWtT1MNicJKNnJt/wC2VvR+vgcNFhg377jyGQRCRuA8cz6rW0loUREj7RA4cQ85+YCxjIwHVDg48sx5oPSi6Vko2t84kHnl6BNFELtgAJ7Jc0C6O0Wj4jVaLce4bys4Yo3kqaMq/wBOElmtfz/YysXhXMNkGiaB3FVnLTxrXFpIJ4kXkazyWUXLaLufD4ug6VRq2ju1yv7EVClNQVHMiKZydM5JghkkkkAMiwISv6KwpldqjZtceA3pF06cqk1CCu27JfPiN7oboCPFSgzydXCHxRkjJ0kkrw1kTCd+1xO5rSum6VYaPCYmfDwRiNsTo2saCT7TAdck7SbVWJsbcO3DFrg1sjpWvYLcxzgGgkWCaDQLAJGdbVodKJ2zyx4oPa50sEHXapv/AO6PXY4nIUSNU0QNuxKbi46HtdF4XE4fpFQqQcXaSv2Wtuns9bd/dfQ5zAaML3C967aUxYdsTKDgBruZue/cX8Wjc1YOFlDM1SMjsQS4nVZmcz2nUNgPhS52m2fVvCwpySS4839+xLjxOkk6XyA6kLQDwY0NrvO5MdKyO7WIme79hry1vidp9Fz4lDBqtbXd8zvUCSe0TQ947PDee4JWuP8AhqMFsly93qdL/wAWGNupCxrRyFDvobSqkmmMRJ7Uha3iTQ8AMz5eKwTiwP8ADbZ95w+Dd3x7lCpH+04n936p2IjTpX6kNeNvf9zaOkmNNuJef2iWt8gbPmiHpbKBqxgMHBjAz13oeg+jT529YNVsd0ZHO1GWNoDj7R5NsjgtPSAwODYXEvncMtWO2R63umUtLj5NVRpt7L8jzsZ0jgaEstVqUl/Kus/0ozDpXFv2vcBzc4egzWjFoXFuaHyyGJh+/K8QN7wZCC7wC5yfplitmFgjw7eMTLlrnO/WffcQjdHcTeJGIxxe5rRrHta75HDYwue+2g5Wc9hpaRpRX4mebU6VxVRWwuGt35XL0WVfe522F6KwhjDLiXyOlvqmR5mTVFkx9ZWuBxLQ3mvOcfpB/WuZAywHUGvDdYUMy5zA1ozvu4nadvpDp2bFTCZzy0NBbHEw6rWtOVA7dmX3fU3lRgDstFN4NFKJNZtErfPI9DB4THztPEVnF8Fb0XVXPWwWMGgTqg/e1fZHiul6HdNRg36shc+E5EAWW8wDtXITMlkDuqA1Wi3Pc4MYBYGu5x2myMhZ5LOj0JJKSW4iGU+6yR13RNdprWjIE7dx2pxg3qhdL9KYdJ4dxz8f68fzOh01pRk2IllY0Na4ucKFAC8suNZ95VMFYBbJE7UfdjIWKcD7rgVdOk6GQScWjbBdK0Z09dEtPBFyfAtfnVO95uf4hvWXicE6PtGtX3h8wmk0g929VyXHiqSaPPx9TB1ruMGpcVpfmtn5PvDQaSLeJHuqzPpRrhRZrcnG1mCAqRiraiyOajjK9KH01K64PXwv6BINJSxO1oZZI9/Ze4et2n0lp/EzUHyuJGYJouJHF5GsfE0qkjhuzPJBxED9XWMbgBvIKpM4KkNHKC1Wui28NuZbOKL26+8ZOHPce4o+iM5LOwZqngIXOuSjqVqyO2BtkC742WmuKvYNuownfQ+Klqx34GtKrNVJv8Or+2vnp97mjDhnYl7jYa1ot7i7Va0bBbt3ChmTsQNJ6M6lvXwysmjvVc6N7ntv3SHAOaazFhE0lCx+F6hlh8QbO82aeZGFwscoxtOxzqHtlQ0HUUMbH7MS/Vfs9h1sac9mq8Rvv9oLVRVrHkVsXVqVXVbd/T528SrM/LlWXcdiyFpYi20xwottjhzBI+g8FkkqYdp0dIVPqKEu72CBCtJRpWefcv8AVxcD5lOWRcPUqlrJa6kZdEcPA+ZU+qg4H8R+qoa6WsgC6YYOB8ytTRmJhj7LTqE5uJ1iCPFc9rKyJxqtBANWMgAa27d+07UpK6OvBYuWGq/UjFN9/wA0Oxa+9lqbroE3R2GsjRo0d64/rQwjq3kXd20CqGQzv88UeDHS3m8nmaPxWbgz6WH9pIW68GuWvsdHLmNXdv8AogzOOsKeWgNc2h+0sxmLfsvuyCGJ3+96IyMKvTmFmrdbs4rZ3WqaNWMBvvO/edrKTjeZ/PcsgTP4pHEu435/VGRk/wB+Ye1kn4GwHJpDrCjs/eLfVqxZMW8C6b3b1dYZC0SRvjraNZlVXE8kZbFw6VjXTUFfitNvubD8RJOWsc8v1RTA59hoG5useyOQSbh5Kqn1toB9d+WSwoukWPAL2zTANNazTTb5EZKq7TWJcSXSvN77ajKcEOl4U9IQtyS/Y6sYJ+8O9D8M1CTDEbcvzwXISY2U5mV3nXwTx4l+3XdfMk/HcjIbLp6KesX5HRSzAb77skF2JyO5VmyhwB4/Hgq+NmLGFw2igN+ZI3FJR7DuqY1qm6i2tfyAyxyyzswz3agvJozDdYWTV9p1b78aVmLD9VBKwdrtTC6rW1BHCMu+dyJorFRyuBOq0tDnGN2sAwhpJkgc3tgXmYxzIvcYazmDDuiayRzCWjMEPMokaNZ7qIeAd95ZldFrbHxN80ry7Xr9wejcV9oY6KWzJGwujcfaexpGvG47dZoLnA57CMta1nzRnXLeau6Pwb4sQ2brIBT2uLTiIiSD7YprjtFqxi8OyKSQk5McWZ7TqnV8zSl7XOmhJxlKF7rjyKkcFKL3Aczw2osbXSZnst4b/FXIomN+6Vnc9zDdHTqrNJ5UUo45HeyNUcd6p6Q0dK3MgvHvNzrvauhjcT7LQUYRPq7DRyyQdVXB4KMMsqjT4r2+PvONwOPdE7WaQeIOw/RdVo/SsUwIIN0bjdZBy2aw+6hYrDRe1IASOO9VMRpOhqxNDRyFeiZyYTFV8K3GE80ODXy3mu4WNgcGNga0NaM61iXF3vO7tlIeIyYBe9g8u2fgnwWYJJsnaU2MNdXezrGg9xsH4pLVoHQjRwk5R7Ysushc7FYlwIDGslY6zRrt9WG37vVA55dkA1aHgoZp3Qzxxh4aIY9Rmq6nxyxizGCSAWtaNaqyWppfqcJrPDi50+vI1wy6sytc5jibs6uuGgCqtz7vVDc0F7cUzDNDBTcNGHanaaXRNL3tdtBou31QaDkFulZWPm6kszb+bIDp3Df83O2shK8+dH5qkdHs91y0dJ40PmkkaPakcQcvZ9lu3bkAgDFu5fwqTScsyiuCKX2Bvuu8032BvuuWh9oeeH8KRxTuI/CEGdjnNVPqqeqnDUhA6CekQMUtRAwNBWIYLBdwIy47j5WkI1ZwznM9gt23Tg1w7iHZH+iCoZb9bbuK2IiyadntXlVbOPcqh7ObXZ3+eRW64PADi6No2jsyO2HedUj1Ktx6T1gQ5mBlv3odQ/ja5hvxQky6/wBPN1HdWW6sY32i2AuoX4URvz2ju4I7Zw7PZx7+PctvAyOFNjgjzIprMRI6+A6txkvbsCfSEMjq1tHOZQ2twjxd5km4xZ8AnlMMxiNeDmDY3kbBfNUsXiaOq057zlS0MQc76gs5dS0D1zWfO0F2tTm/7W1srZaLBcqOnd7x8/otHQ2MAJikJ1JMieBOQPyVjRWBgeLmmdHnVdXlyJdmPMLodHYXRUYzeHu4uLj/AA6ur6KJNbWfgehg6FTMqkZxXOS27dPexk4nowKtjs9wdsWA+NzHarhRBzBXpgxmCOyS/Bx+DQqelYsFPVuojIPaJA7zIz8VlGb7Uz08Xg8PUV6MoxfNWfm7Pl9zg2EHIj1pW8JBI8dlpIGRrJt8zsWxJoPBCz1svkK+AVYfZ4ySx0hJ39VGa/d7eRrfVrXMea8FPslF8pL87FHDSUSNxzHh+fRR0iHOYaFgG3cgTQ9SEi6NvsteebyMu5gV7RONa15Y9xEcrXMeQaLNhZIDu1XBpvPLWSW5tUlKnhnTk0+XC/zbTvAaBiIjkbqN15hqRufYaxrDrSSEDc3Vb2jkC3fRC08S6QyOdimslbCxr2nq9UygdkNY4gExa0riX0bDLCz9OzugeYQ0sc3V18hTgwgxtYQTcWVjiczZ2FwuMZNI4NDmtoMaCbLYpA+N4AGwB02uG51qnw17jyAOisRiJJWNhtrTIASxobddpwdIBrHIE5krexsIkkksAt6x7hYvaSfmsno0z7O04p4rJzYQbBLyO1LXBuXK6G9UcbpskBrCRxdvs7hyUtdWxtSmszkzanlij9pwvgVmz6eaP8MNHMiz9FmYbHMYDcLJH37chca5aoNeam/Ts33CyPlGxrPVov1UZT0Hi4ZPx68LOT83FeF13lkabxG0F1fuivglHpWa7cbyoAmgPALJlxb3ZucT3m0EuPFPKcksSr6NvwXudJHGX5yOaBw1h/ZJ7oR98ef0WFBo+V/sRSO/dY53wC0WdFMYRfUOA/aLWejiE8posfJKyh4u5ZbjYWnJ3fQcVT0pjmyarWbBmTVZ7lZHRLEb9Qf7rryCswdD3k/4gHc2/mE7E1cbWqQcNl3f1FiMLJjo2Oi7UsY1HRa3acyyWvYDkS2y0i7oMIvOtnSWHMUj8RINWVzdSNl9ptsEb5XD7vZbqtvaSTVDOhD0Xew5T1/2/wD9K2zo+DnLM4i8w0Nbfnaq5yZTEYzmEQsHFdRhsBgm7Y3uP7RJ9A4D0V+KfCtyYxrT+5XqkaHHQ4J7vZa48w3LzVoaEm90/iZ9V1f2qM/eb5JusZySA8yEamIEZSaEEWBCAqQgKOAURqQ7AmwKT4iAdUNJ5q5EDz81YgFn+xCY7HKTxSXZa6+IBr0VWQHeCO9ehR0Nob40rUcLTuH58UXJcDzBHjxkjfZkeO5xHzXpJ0Ex2ZiY7wYk7ozhj/0wD/tA9Ci5ORnnR0lN/nSfjd9VA46X/Nf+N31XpLeiGEdtYfC/k5W4ugOCO0O/GR8XIuPIzyx2OkO15Pf2j5lR+2P4j8LfovYY/wBGuCOwPPdIf6hO39EeFOfWTjkJI/mxFxZGeQDGu4N/CB8E5x7+Xr9V7F/8RYPe/E/jj/8AWhj9FGC9/Ef+SP8A9adwszx77UeA9fqiNxLd7T4FewD9FeB44j/yM/kUx+i3Af6/jI3+VLQpOaPI2zRVmT6qpPN2rachsXtY/Rro5u1shHOb6KyzoNopmYhaf3pJHD1dSQPM1ZnkmC080sbFiYmzRtFMBJY9nJsgB7P7JB5UpDH4OMl0cL3OIIGvJTW2CCNWMAuFHiDzXsQ0HgG5DCYY98cbvUgosUGGj9jD4dvdGxvwCeYMjPDsZjp8W7JrnHIUxpNDOmhrRk0Z5DmdpKnhOiOOk9nCy97m9WPN9L3F+kw3ZqgcAf6qlNppuwkeZ+qMw/pnmGF/RzjHVr9XHxDnEkfhBHqtfCfo3jbRmnLuTAG+Gd/JdXNplvEeZ+aqyabByy78ksxSpIos6KYOPMQhx4vdI70uvRWYMDCz2YIW9zCEHEab/NqnJpf82lcrIjbMja1Mh7u3y25BZuIOeR8Dn8lmTaWvIqpJpXO9/ei47I6SB7aFtz4hzm+NUhS4uNuwfxk5+SwP1y7cfUqvPpBxzv1TuDjY6H9ZR74x+P6qnNimE20AdzlgfbXbFAzkpkGo/EniPxKP2k73fxLK1+9LrhzQJ6F8zjj6oEmIN7D+IKuZB+QmTsK5ANUw3ko0mKkYWkiEOkwCAChFZKdxpVgPzaMwoGi0yR3E+amcURvQGqEjUFNF6PSThv8AUog0kd5vvKyVG0gsdDDpst2V5q2zpM4f3XIpwxK5SiztIelD/wAlXIukch3+YXD4ccltYBl/2Utnbh8Mp7s6Qael4j4fJQd0kkG/1Kx5K/LSPkqkkg/IKm7O2rgYRV8y+fc6EdInnePMqH6+dvr1WLERSmazVanJ9CC7TSf0gdss+B/oq03SB3NZL2DiqOLUqWo6mGWRyTNx/SN/PzKhJpwkD2vz3rlnORJXdltc1qjzZG+NKE8++kM6Svaxvk36LBhkS1jaBxOg+1N90eQUmYiPe1vkPosJj0Rr0jZJG110X+W1CmfFXsNHdf1WbrIL5ECcUXyyH3R5u+qYQRe6PN/yKzTOUhOUyHY0xh4vd/id9UnYaHgfBx+azTiDy8k5xR/IQJvQ0PssG7W81NuAh/1PxBZYxDuKsRYg/kKjMtv0dDuLx4g/JQ/VrNxefIfJCOJcl9oegHYKNFNva/xopfqwe98FDrncfVN1zuKonQp3y9U/h8EklDGLwSscEkkgF4KYTJIGg7O71TO7kkkFIETyUXE7gkkkXYdoPBTaE6SRUWTZf5/utDCTkf2/qkklY6Kc5LZhZJRt1Tfh9VXkk/Z9QnSQkaznK25Br/2T5orZOXqkkqMbsiXG8h6qrO8HaAnSWbWpeeWXcpvI4ITnDgkktEck9xg7kmLuSSSdiUOHKTX8k6SRTbEX8kJzuRSSTM2yN96kHJkkxD2EziBn5pJIEwrQOCKwhMkmIcuH5tOJR+bSSTExdb3+qj13P0SSQSf/2Q==" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRfUQdRmkbgJbIy8rZhQlt68zQ5DCbNvybpw&usqp=CAU" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4M9KI_4aRw3oCydWnNUuQKfvC_yfStPzhoA&usqp=CAU" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
            <Catogory />
            {data && data.categories.data.map((category) => {
               console.log(category.categoryimage)
              return(   
              <div>
           <Link href = {`/brands/${category.id}`}>{category.attributes.categoryname}</Link>
           <br></br>
                </div>
              )
            })}
      </main>
    </div>
  )
}
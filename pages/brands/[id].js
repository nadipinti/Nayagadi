import React,{useState} from "react";
import styles from "../../styles/_toolbar.module.scss";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from 'next/router'
import Image from 'next/image'


const BRANDS = gql`
query getBrands($id : ID!){
    company (id : $id) {
    data {
        id
        attributes {
          name
            categories {
            data {
              id
              attributes {
                categoryname
                brands {
                  data {
                    id
                    attributes {
                      name
                      brandimage
                    }
                  }
                }
              }
            }
          }
        }
       
        }
  }
}
`
const brands = (props) => {
    const router = useRouter()
    const { id } = router.query
    console.log(id)
    const {loading,error,data} = useQuery(BRANDS,{
        variables : {id:id}
    })
return (
    <div>
      {data && data.company.data.attributes.categories.data.map((brands) => {
          return (
      brands.id == id ?  (brands.attributes.brands.data.map((data ) => {
            console.log(data)
            return(
                <div key = {data.id}>
                  <h1>{data.attributes.name}</h1>
                </div>   
            )
        }) ) :null
        )
      })}  
</div>
)
}

export default brands;
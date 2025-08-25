import { useEffect, useState } from "react";
import { supabase } from "./client";

import { AddCreator } from '@/pages/AddCreator'
import { ShowCreators } from '@/pages/ShowCreators'
import { ViewCreator } from '@/pages/ViewCreator'
import { EditCreator } from '@/pages/EditCreator'

import { Button } from "@heroui/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { Link, Navigate, useRoutes } from "react-router-dom";

export default function App() {
  const [data, setData] = useState<Creator[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
      if (error) {
        console.error('Error fetching creators:', error)
      } else {
        console.log('Fetched creators:', data)
        setData(data ?? []); // important to check for null case
      }
    }
    fetchData();
  }, [])


  const element = useRoutes([
    {
      path: '/',
      element: <ShowCreators data={data} />,
    },
    {
      path: '/new',
      element: <AddCreator />,
    },
    {
      path: '/:name',
      element: <ViewCreator />,
    },
    {
      path: '/:name/edit',
      element: <EditCreator />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ])



  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">CREATORVERSE</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} to="/" color="default" variant="flat">
              View All Creators
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} to="/new" color="primary" variant="flat">
              Add Creator
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mt-4">CreatorVerse</h1>
        <h1 className="text-center mb-4">Discover and share your favorite content creators!</h1>

        <div>{element}</div>
      </div>
    </>
  )
}

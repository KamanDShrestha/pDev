import useDocumentTitle from '../../services/getTitle';
import UserProfile from '../../components/UserProfile';
import useGetAllUsers from '../../services/users/getAllUsers';
import Heading from '../../components/Heading';
import { Input } from '../../components/ui/input';
import { FaSearch } from 'react-icons/fa';
import { Card, CardContent } from '../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import useGetJourneyNames from '../../services/journey/getJourneyNames';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';

const UsersAction = () => {
  const [searchName, setSearchName] = useState<string | undefined>();
  const [role, setRole] = useState<string | undefined>();
  const [preferredJourney, setPreferredJourney] = useState<
    string | undefined
  >();
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState('asc');
  const [limit, setLimit] = useState(3);
  const [pageNumber, setPageNumber] = useState(1);
  const skip = (pageNumber - 1) * limit;

  const roles = {
    qha: 'Qualified Health Personnel',
    admin: 'Admin',
    user: 'User',
  };

  const { data, isLoading: isFetchingUsers } = useGetAllUsers(
    searchName,
    role,
    preferredJourney,
    limit,
    skip,
    sortBy,
    sortOrder
  );

  useEffect(() => {
    setPageNumber(1);
  }, [role, preferredJourney, sortBy, sortOrder, limit, searchName]);

  const { users, totalUsers } = data || {};
  const numberOfPages = (totalUsers && Math.ceil(totalUsers / limit)) || 0;
  const { data: journeyNames, isLoading: isFetchingJourneyNames } =
    useGetJourneyNames();

  console.log(users);

  useDocumentTitle('Users - SelfSync');
  return (
    <>
      <Heading>Users</Heading>
      <Card className=' max-w-[900px] mx-auto my-5 '>
        <CardContent className='flex flex-wrap items-center justify-around gap-5 p-3 my-3'>
          <div className='flex items-center gap-3'>
            <Input
              className='w-[400px]'
              placeholder='Search for users'
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <span className='text-2xl hover:cursor-pointer'>
              <FaSearch />
            </span>
          </div>
          <div className='max-w-[300px]'>
            <Select
              onValueChange={(chosenRole) => {
                setRole(() => chosenRole);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select a role' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value={'all'}>All</SelectItem>
                  {Object.entries(roles).map(
                    (role) =>
                      role[0] !== 'admin' && (
                        <SelectItem value={role[0]} key={role[0]}>
                          {role[1]}
                        </SelectItem>
                      )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='max-w-[300px]'>
            {isFetchingJourneyNames ? (
              <LoadingSpinner />
            ) : (
              <Select
                onValueChange={(chosenPreferredJourney) => {
                  setPreferredJourney(() => chosenPreferredJourney);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a preferred journey' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Preferred Journey</SelectLabel>
                    <SelectItem value={'all'}>All</SelectItem>
                    {journeyNames?.map((journey, index) => (
                      <SelectItem value={journey} key={index}>
                        {journey}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </CardContent>
        <CardContent className='flex justify-center gap-5'>
          <div className='max-w-[300px]'>
            <p className='font-medium'>Sort by</p>
            <Select onValueChange={(value) => setSortBy(() => value)}>
              <SelectTrigger>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fields</SelectLabel>
                  <SelectItem value='firstName'>Name</SelectItem>
                  <SelectItem value='createdAt'>Sign-up date</SelectItem>
                  <SelectItem value='dateOfBirth'>Date of birth</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='max-w-[300px]'>
            <p className='font-medium'>Sorting order</p>
            <Select onValueChange={(value) => setSortOrder(() => value)}>
              <SelectTrigger>
                <SelectValue placeholder='Sorting order' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fields</SelectLabel>
                  <SelectItem value='asc'>Ascending order</SelectItem>
                  <SelectItem value='desc'>Descending order</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardContent className='flex justify-center'>
          <div className='max-w-[330px]'>
            <p className='font-medium'>Number of users</p>

            <Select onValueChange={(value) => setLimit(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder='Select number of users to fetch' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel placeholder='Number of users' />
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                    <SelectItem value={number.toString()} key={number}>
                      {number}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className='flex flex-wrap justify-center gap-5'>
        {isFetchingUsers && <LoadingSpinner />}
        {users &&
          users.map((user) => <UserProfile user={user} key={user._id} />)}
      </div>
      <Pagination className='flex flex-col items-center justify-center gap-3 my-10'>
        <p>
          Showing {1 + skip} to {skip + (users ? users?.length : skip)} of{' '}
          {isFetchingUsers ? <LoadingSpinner /> : `${totalUsers}`} users
        </p>
        <PaginationContent>
          {pageNumber !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPageNumber(pageNumber - 1)}
              />
            </PaginationItem>
          )}
          {totalUsers &&
            Array.from({ length: numberOfPages }, (_, i) => i + 1).map(
              (page) => (
                <PaginationLink
                  isActive={page === pageNumber}
                  onClick={() => setPageNumber(page)}
                  key={page}
                >
                  {page}
                </PaginationLink>
              )
            )}
          {pageNumber !== numberOfPages && (
            <PaginationItem>
              <PaginationNext onClick={() => setPageNumber(pageNumber + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default UsersAction;

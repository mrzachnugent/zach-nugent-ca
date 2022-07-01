import { useApp } from '../../app-context';
import { signOut } from '../../firebase';
import { Spacer } from '../Spacer';

export const AvatarDropdown = () => {
  const { user } = useApp();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <>
      {user?.photoURL && (
        <>
          <Spacer width={8} />
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <img src={user?.photoURL || undefined} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
              <button className='btn btn-primary' onClick={handleSignOut}>
                Log out
              </button>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

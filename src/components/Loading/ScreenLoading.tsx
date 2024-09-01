import { Spinner } from '@chakra-ui/react';

function ScreenLoading() {
  return (
    <div className="w-svw h-svh fixed top-0 left-0 z-40 flex justify-center items-center bg-black opacity-50">
      <Spinner zIndex={50} color="blue.200" size="xl" thickness="4px" />
    </div>
  );
}

export default ScreenLoading;

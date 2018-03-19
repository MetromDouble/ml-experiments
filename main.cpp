#include <iostream>
#include <cmath>
#include <cstdlib>
#include <ctime>
#include "mnist/simple.hpp"

using namespace std;

#define MNIST_DATA_IMAGES_LOCATION "mnist/dataset/train-images.idx3-ubyte"
#define MNIST_DATA_LABELS_LOCATION "mnist/dataset/train-labels.idx1-ubyte"

int main(int argc, char* argv[]) {
  srand(time(nullptr));

  unsigned char** ar;
  ar = read_mnist_images(MNIST_DATA_IMAGES_LOCATION, 10000, 784);
  for(int i=0; i < 28; ++i)
  {
    for(int j=0; j < 28; ++j)
    {
      switch ((int)ceil((int)ar[argc > 1 ? atoi(argv[1]) : 0][(28 * i) + j] / 64))
      {
        case 3:
        {
          cout << "\xdb";
          break;
        }
        case 2:
        {
          cout << "\xb2";
          break;
        }
        case 1:
        {
          cout << "\xb0";
          break;
        }
        default:
        {
          cout << " ";
        }
      }
    }
    cout << endl;
  }

  return 0;
}

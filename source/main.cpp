#include <iostream>
#include <cmath>
#include <cstddef>
#include <cstdlib>
#include <ctime>
#include "./mnist/simple.hpp"

using namespace std;

#define MNIST_DATA_IMAGES_LOCATION "./source/mnist/dataset/train-images.idx3-ubyte"
#define MNIST_DATA_LABELS_LOCATION "./source/mnist/dataset/train-labels.idx1-ubyte"

int main(int argc, char* argv[]) {
  srand(time(NULL));

  unsigned char** ar;
  ar = read_mnist_images(MNIST_DATA_IMAGES_LOCATION, 10000, 784);
  for(int i=0; i < 28; ++i)
  {
    for(int j=0; j < 28; ++j)
    {
      cout << (int)ar[argc > 1 ? atoi(argv[1]) : 0][(28 * i) + j];
      if (j != 27) {
        cout << ",";
      }
    }
    if (i != 27) {
      cout << "|";
    }
  }

  return 0;
}

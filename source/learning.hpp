#include <iostream>
#include <vector>
#include <cmath>
#include <cstdlib>

using namespace std;

class Neuron {
  private:
    float bias;
    vector<float> w;

    float act(float act_potential) {
      return fmax(0.0, act_potential); /* ReLU */
    };
    void w_init() {
      for(int i = 0; i < w.size(); i++) {
        w.assign(i, (float)rand() / RAND_MAX);
      }
    };

  public:
    Neuron(int w_count, float bias_size = 0.0) {
      bias = bias_size;
      w.reserve(w_count);
    }
};

class Layer {
  private:
  public:
    Layer(int layer_size, float bias_size = 0.0) {

    }
};

class Net {
  private:
  public:
    Net(int layer_size, float bias_size = 0.0) {

    }
    train() {

    }
    classify() {

    }
};

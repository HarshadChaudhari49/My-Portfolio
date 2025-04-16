from transformers import pipeline

class LLMModel:
    def __init__(self, model_name="gpt2"):
        """
        Initializes the LLM model using Hugging Face's transformers pipeline.
        Loads the specified model for text generation.
        """
        try:
            self.pipeline = pipeline("text-generation", model=model_name)
            print(f"✅ Model '{model_name}' loaded successfully!")
        except Exception as e:
            print(f"❌ Error loading model: {e}")

    def generate_text(self, prompt, max_length=150):
        """
        Generates text based on the given prompt.

        Parameters:
            - prompt (str): Input prompt for text generation.
            - max_length (int): Maximum length of the generated text.

        Returns:
            - (str): Generated text.
        """
        if not prompt.strip():
            return "⚠️ Please provide a valid input."

        try:
            result = self.pipeline(prompt, max_length=max_length, num_return_sequences=1)
            return result[0]["generated_text"].strip()
        except Exception as e:
            return f"❌ Error generating text: {e}"

# Example usage (for testing)
if __name__ == "__main__":
    model = LLMModel()
    print(model.generate_text("Once upon a time,"))

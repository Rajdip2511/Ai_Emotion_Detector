"""
Test script to verify the complete emotion detection application is working
"""

import requests
import time

def test_flask_server():
    """Test if Flask server is running and responsive"""
    try:
        response = requests.get('http://localhost:5000/', timeout=5)
        if response.status_code == 200:
            print("✅ Flask server is running successfully")
            return True
        else:
            print(f"❌ Flask server returned status code: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Flask server is not accessible: {e}")
        return False

def test_emotion_detector_endpoint():
    """Test the emotion detector API endpoint"""
    test_cases = [
        {
            "text": "I love this new technology!",
            "expected_emotion": "joy"
        },
        {
            "text": "I am really mad about this",
            "expected_emotion": "anger"
        },
        {
            "text": "I am so sad about this",
            "expected_emotion": "sadness"
        },
        {
            "text": "I think I am having fun",
            "expected_emotion": "joy"
        }
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        try:
            url = f"http://localhost:5000/emotionDetector?textToAnalyze={test_case['text']}"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                result = response.text
                if test_case['expected_emotion'] in result.lower():
                    print(f"✅ Test Case {i}: '{test_case['text']}' -> Expected: {test_case['expected_emotion']} ✓")
                else:
                    print(f"⚠️  Test Case {i}: '{test_case['text']}' -> Expected: {test_case['expected_emotion']}, Got: {result}")
            else:
                print(f"❌ Test Case {i}: API returned status code {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Test Case {i}: Request failed - {e}")

def test_error_handling():
    """Test error handling for empty input"""
    try:
        url = "http://localhost:5000/emotionDetector?textToAnalyze="
        response = requests.get(url, timeout=5)
        
        if response.status_code == 200 and "Invalid text" in response.text:
            print("✅ Error handling working correctly for empty input")
        else:
            print(f"⚠️  Error handling test: Got response '{response.text}'")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Error handling test failed: {e}")

def main():
    """Main test function"""
    print("🚀 Testing Emotion Detection Application")
    print("=" * 50)
    
    # Test Flask server
    if test_flask_server():
        print("\n🧪 Testing Emotion Detection API...")
        test_emotion_detector_endpoint()
        
        print("\n🛡️  Testing Error Handling...")
        test_error_handling()
        
        print("\n" + "=" * 50)
        print("✅ Application testing completed!")
        print("\n📋 Next steps:")
        print("1. Open your browser")
        print("2. Go to http://localhost:3000")
        print("3. Test the React frontend interface")
        print("4. Try different emotion texts and see real-time results")
        
    else:
        print("\n❌ Flask server is not running. Please start it first:")
        print("   cd backend/final_project")
        print("   python server.py")

if __name__ == "__main__":
    main() 
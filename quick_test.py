"""
Quick test to debug the emotion detection timeout issue
"""

import sys
import os
sys.path.append(os.path.join('backend', 'final_project'))

from backend.final_project.EmotionDetection import emotion_detector

def test_emotion_function():
    """Test the emotion detection function directly"""
    print("🧪 Testing emotion detection function directly...")
    
    test_text = "I love this new technology!"
    print(f"Input: '{test_text}'")
    
    try:
        result = emotion_detector(test_text)
        print(f"✅ Result: {result}")
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_flask_endpoint():
    """Test the Flask endpoint directly"""
    import requests
    print("\n🌐 Testing Flask endpoint directly...")
    
    try:
        url = "http://localhost:5000/emotionDetector?textToAnalyze=I love this new technology!"
        print(f"URL: {url}")
        
        response = requests.get(url, timeout=30)
        print(f"✅ Status Code: {response.status_code}")
        print(f"✅ Response: {response.text}")
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Quick Debugging Test")
    print("=" * 40)
    
    # Test function directly
    func_ok = test_emotion_function()
    
    # Test Flask endpoint
    flask_ok = test_flask_endpoint()
    
    print("\n" + "=" * 40)
    if func_ok and flask_ok:
        print("✅ All tests passed! The issue might be with the frontend proxy.")
    elif func_ok and not flask_ok:
        print("⚠️  Function works but Flask endpoint has issues.")
    else:
        print("❌ Function itself has issues.") 
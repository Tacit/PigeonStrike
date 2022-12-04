using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Stage1StartButtonScript : MonoBehaviour {

	public void StartStage1()
    {
        GameManager.Instance.Reset();
        SceneManager.LoadScene("Stage1");
    }
}
